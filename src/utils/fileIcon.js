export function fileIcon (suffix) {
	let defaultSrc = null
	switch(suffix) {
    case 'xls':
      defaultSrc = 'https://attach.lieduoduo.ziwork.com/front-assets/images/icon_document_excel@3x.png'
      break
    case 'xlsx':
      defaultSrc = 'https://attach.lieduoduo.ziwork.com/front-assets/images/icon_document_excel@3x.png'
      break
    case 'ppt':
      defaultSrc = 'https://attach.lieduoduo.ziwork.com/front-assets/images/icon_document_ppt@3x.png'
      break
    case 'pptx':
      defaultSrc = 'https://attach.lieduoduo.ziwork.com/front-assets/images/icon_document_ppt@3x.png'
      break
    case 'pdf':
      defaultSrc = 'https://attach.lieduoduo.ziwork.com/front-assets/images/icon_document_ppt@3x.png'
      break
    case 'doc':
      defaultSrc = 'https://attach.lieduoduo.ziwork.com/front-assets/images/icon_document_word@3x.png'
      break
    case 'docx':
      defaultSrc = 'https://attach.lieduoduo.ziwork.com/front-assets/images/icon_document_word@3x.png'
      break
    case 'png':
      defaultSrc = 'https://attach.lieduoduo.ziwork.com/front-assets/images/icon_document_png@3x.png'
      break
    case 'jpg':
      defaultSrc = 'https://attach.lieduoduo.ziwork.com/front-assets/images/icon_document_jpg@3x.png'
      break
    case 'jpeg':
      defaultSrc = 'https://attach.lieduoduo.ziwork.com/front-assets/images/icon_document_jpg@3x.png'
      break
    case 'txt':
      defaultSrc = 'https://attach.lieduoduo.ziwork.com/front-assets/images/icon_document_txt@3x.png'
      break
    default:
      defaultSrc = 'https://attach.lieduoduo.ziwork.com/front-assets/images/default_ext.png'
      break
  }
  return defaultSrc
}