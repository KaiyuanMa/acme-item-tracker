function showCollapsible() {
  const button = document.querySelector(".collapsible-btn");
  button?.classList?.toggle("collapsible-btn--active");
  const content = button?.nextElementSibling;
  const text = button?.firstChild;
  if (button?.classList?.contains("collapsible-btn--active")) {
    content.style.maxHeight = content.scrollHeight + "px";
    text.style.transform = "rotate(90deg)";
  } else {
    content.style.maxHeight = 0;
    text.style.transform = "rotate(0deg)";
  }
}

export { showCollapsible };
