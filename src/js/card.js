import { addWrapper, capitalizePrint } from './functions'
import Print from './print'

export default {
  print: (params, printFrame) => {
    // Check if we received proper data
    if (typeof params.printable !== 'object') {
      throw new Error('Invalid javascript data object (card).')
    }

    // Variable to hold html string
    let htmlData = ''

    // Check print has header
    if (params.header) {
      htmlData += '<h1 style="' + params.headerStyle + '">' + params.header + '</h1>'
    }

    // Build html data
    htmlData += cardToHTML(params)

    // Store html data
    params.htmlData = addWrapper(htmlData, params)

    // Print json data
    Print.send(params, printFrame)
  }
}

function cardToHTML (params) {
  let data = params.printable

  let htmlData = '<div style="display:flex; flex-direction: row; flex-wrap: wrap;">'
  // Create html data
  for (let i = 0; i < data.length; i++) {
    htmlData += '<div style="width: 69.94mm; height: 42.361mm; display: flex; justify-content: center;  align-items: left; flex-direction: column;">'
    htmlData += '<div style="padding:0 8mm 0 8mm; font-size: 13px;  font-weight: 300;">' + data[i]["title"] + '</div>'
    htmlData += '<div style="padding:0 8mm 0 8mm; font-size: 11px;  font-weight: 300;">' + data[i]["content"] + '</div>'
    htmlData += '<div style="padding:0 8mm 0 8mm; font-size: 11px;  font-weight: 300;">' + data[i]["subcontent"] + '</div>'
    htmlData += '</div>'
  }
  htmlData += '</div>'

  return htmlData
}
