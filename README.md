# @rbxts/component
A simple tag-based component library for Roblox TS.

```ts
import { Component, TagComponent } from "@rbxts/component"
import { RunService } from "@rbxts/services"

@Component({
    Tag: "Rainbow"
})
export class Rainbow extends TagComponent<Part> {
    public ResetColor!: Color3

    public Speed = 100
    public Hue = 0

    public Start() {
        this.ResetColor = this.Instance.Color // we need to remember the part's original color to revert it later

        this.Trove.add(RunService.Heartbeat.Connect((DeltaTime: number) => {
            this.Instance.Color = Color3.fromHSV(this.Hue/360, 1, 1)
            this.Hue += DeltaTime * this.Speed

            if(this.Hue > 360) {
                this.Hue = 0
            }
        })) // we add this to the built in trove so the RenderStepped connection gets disconnected the instance this component is attached to is destroyed, or the Rainbow tag is removed

        this.Trove.add(() => {
            this.Instance.Color = this.ResetColor
        }) // we also want to reset the part to it's original color, so let's do this
    }
}
```