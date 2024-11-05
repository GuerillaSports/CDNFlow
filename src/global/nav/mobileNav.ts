export function setNavBarActiveIcon() {
  console.log("[gs-cdnflow/global]: set navbar active icon")
  const activeElement = document.querySelector(".navbar__link-block.w--current");
  if (!activeElement) return undefined;

  const icons = {
    filled: activeElement.querySelector(".navbar__icon--filled"),
    outlined: activeElement.querySelector(".navbar__icon--outline"),
  }

  if (!icons.filled || !icons.outlined) return undefined;

  console.log("[gs-cdnflow/global]: setting active icon")
  icons.filled.classList.remove("hidden");
  icons.outlined.classList.add("hidden");
}


