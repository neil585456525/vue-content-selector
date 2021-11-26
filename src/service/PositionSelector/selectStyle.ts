// preview block when selecting position
export const previewElClassName = 'dotta__preview-el';
const previewElStyle = /* css */ `
.${previewElClassName} {
  background-color: #5a62b3;
  min-width:100px;
  height:80px;
}
`;

// el style when hovered
export const selectedClassName = 'dotta__selected';
const selectedStyle = /* css */ `
.${selectedClassName} {
  border: #5a62b3 2px solid !important;
}
`;

export function addStyleTagToDocument(): void {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = selectedStyle + previewElStyle;
  document.getElementsByTagName('head')[0].appendChild(styleEl);
}
