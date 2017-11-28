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

  let htmlData = '<div style="display:flex; flex-direction: row; flex-wrap: wrap; margin: 10px; justify-content: center;  align-items: center;">'
  // Create html data
  for (let i = 0; i < data.length; i++) {
    htmlData += '<div style="margin: 10px 0 10px 0; padding: 10px 0 10px 0; width: 340px; height: 150px">'
    htmlData += '<div style="font-size: 24px;  font-weight: 300;">' + data[i]["title"] + '</div>'
    htmlData += '<p>' + data[i]["content"] + '</p>'
    htmlData += '<p style="margin-top: -10px; padding: 0;">' + data[i]["subcontent"] + '</p>'
    htmlData += '</div>'
  }
  htmlData += '</div>'

  return htmlData
}
