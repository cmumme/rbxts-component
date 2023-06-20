import { Reflect } from "@rbxts/experimental-reflect"
import { TagComponent } from "./TagComponent"
import { CollectionService } from "@rbxts/services"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T> = new(...Parameters: any[]) => T

export namespace Components {
    export const World: Map<Instance, Map<Constructor<TagComponent>, TagComponent>> = new Map()

    export function Get<T extends TagComponent>(ComponentConstructor: Constructor<T>, Instance: Instance, AwaitIfNotLoaded = true): T | undefined {
        return World.get(Instance)?.get(ComponentConstructor) as T
    }

    export async function Instantiate<T extends TagComponent>(ComponentConstructor: Constructor<T>, Instance: Instance, Tag = "NULLTAG"): Promise<T> {
        if(Get(ComponentConstructor, Instance, false)) throw `${Instance.GetFullName()} already has that component instantiated on it.`

        const ComponentsMap = World.get(Instance) ?? new Map()
        World.set(Instance, ComponentsMap)
        
        ComponentsMap.set(ComponentConstructor, new ComponentConstructor(Instance, Tag))

        return ComponentsMap.get(ComponentConstructor) as T
    }
}