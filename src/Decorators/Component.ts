import { CollectionService } from "@rbxts/services"
import { Components, TagComponentConstructor } from "../Manager"

export interface ComponentOptions {
    Tag: string
}

export const Component = (Options: ComponentOptions) => {
    return (ClassConstructor: TagComponentConstructor) => {
        const ExistingInstances = CollectionService.GetTagged(Options.Tag)

        ExistingInstances.forEach((Instance: Instance) => {
            Components.Instantiate(ClassConstructor, Instance, Options.Tag)
        })

        CollectionService.GetInstanceAddedSignal(Options.Tag).Connect((Instance: Instance) => {
            Components.Instantiate(ClassConstructor, Instance, Options.Tag)
        })
    }
}