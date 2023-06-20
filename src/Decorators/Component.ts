import { CollectionService } from "@rbxts/services"
import { Components, Constructor } from "../Manager"
import { TagComponent } from "../TagComponent"
import { Reflect } from "@rbxts/experimental-reflect"

export interface ComponentOptions {
    Tag: string
}

export const Component = (Options: ComponentOptions) => {
    return (ClassConstructor: Constructor<TagComponent>) => {
        const ExistingInstances = CollectionService.GetTagged(Options.Tag)

        Reflect.defineMetadata("component:tag", Options.Tag, ClassConstructor, "object")

        ExistingInstances.forEach((Instance: Instance) => {
            Components.Instantiate(ClassConstructor, Instance, Options.Tag)
        })

        CollectionService.GetInstanceAddedSignal(Options.Tag).Connect((Instance: Instance) => {
            Components.Instantiate(ClassConstructor, Instance, Options.Tag)
        })
    }
}