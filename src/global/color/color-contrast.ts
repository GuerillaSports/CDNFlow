import { GS_BLUE } from "../consts/colors";

export function manageTitleColorContrast(card: HTMLElement | null) {
  if (!card) return
  const on_colors = card.querySelectorAll(".title-on-color")
  const targets = card.querySelectorAll(".title-blue")
  if (on_colors.length !== targets.length) {
    console.warn("[gs-cdnflow/global]: SHOUD NOT HAPPEN! number of on_color and title-blue are different")
  }
  for (let i = 0; i < Math.max(on_colors.length, targets.length); i++) {
    const on_color = on_colors[i] as HTMLElement | null
    const target = targets[i] as HTMLElement | null

    updateTitleColor(target, on_color)
  }
}

export function updateTitleColor(target: HTMLElement | null, on_color: HTMLElement | null) {
  if (!target || !on_color) return
  if (on_color.style.color === "white") {
    target.style.color = GS_BLUE
  }

}

export function manageColorContrast() {
  console.log("[gs-cdnflow/global]: managing title color contrast...")
  const cards = document.querySelectorAll(".card-label") as NodeListOf<HTMLElement>;
  for (let card of cards) {
    manageTitleColorContrast(card)
  }
}
