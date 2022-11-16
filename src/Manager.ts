import { TagComponent } from "./TagComponent"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TagComponentConstructor<C extends TagComponent = TagComponent> = new (...Parameters: any[]) => C

export namespace Components {
    export const World: Map<Instance, Map<TagComponentConstructor, TagComponent>> = new Map()

    export function Get<T extends TagComponentConstructor<C>, C extends TagComponent>(ComponentConstructor: T, Instance: Instance): C | undefined {
        return World.get(Instance)?.get(ComponentConstructor) as C
    }

    export function Instantiate<T extends TagComponentConstructor<C>, C extends TagComponent>(ComponentConstructor: T, Instance: Instance, Tag = "NULLTAG"): void {
        if(Get(ComponentConstructor, Instance)) throw `${Instance.GetFullName()} already has that component instantiated on it.`

        const ComponentsMap = World.get(Instance) ?? new Map()
        World.set(Instance, ComponentsMap)
        
        ComponentsMap.set(ComponentConstructor, new ComponentConstructor(Instance, Tag))
    }
}