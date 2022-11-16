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
        this.ResetColor = this.Instance.Color

        this.Trove.add(RunService.RenderStepped.Connect((DeltaTime: number) => {
            this.Instance.Color = Color3.fromHSV(this.Hue/360, 1, 1)
            this.Hue += DeltaTime * this.Speed

            if(this.Hue > 360) {
                this.Hue = 0
            }
        }))

        this.Trove.add(() => {
            this.Instance.Color = this.ResetColor
        })
    }
}
```