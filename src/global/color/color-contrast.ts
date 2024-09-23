export function manageTitleColorContrast(card: HTMLElement) {
  const gs_blue = getComputedStyle(card).getPropertyValue('--blue')
  const on_color = card.querySelector(".title-on-color") as HTMLElement
  if (!on_color) return;
  if (on_color.style.color === "white") {
    const story_title = card.querySelector(".title-blue") as HTMLElement
    story_title.style.color = gs_blue;
  }
}
