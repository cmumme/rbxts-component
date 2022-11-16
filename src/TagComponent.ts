import { CollectionService } from "@rbxts/services"
import { Trove } from "@rbxts/trove"
import { Components } from "./Manager"

export interface TagComponent {
    Start?(): void
    Stop?(): void
}

export class TagComponent<T extends Instance = Instance> {
    protected Trove = new Trove()

    public constructor(
        public Instance: T,
        public Tag: string
    ) {
        this.Trove.attachToInstance(this.Instance)

        this.Trove.add(CollectionService.GetInstanceRemovedSignal(this.Tag).Connect((Instance) => {
            if(Instance !== this.Instance) return

            this.Trove.destroy()
        }))
        
        this.Trove.add(() => {
            this.Stop && this.Stop()
        })

        this.Trove.add(() => {
            Components.World.get(this.Instance)?.forEach((Component, Constructor) => {
                if(Component !== this) return

                Components.World.get(this.Instance)?.delete(Constructor)
            })
        })

        this.Start && this.Start()
    }

    public Destroy() {
        this.Trove.destroy()
    }
}