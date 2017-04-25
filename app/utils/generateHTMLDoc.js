export default function generateHTMLDoc(file, functions) {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>JSDoc</title>
      <style>
      body{background-color:#fff;color:#353833;font-family:Arial,Helvetica,sans-serif;font-size:76%;margin:0}a:link,a:visited{text-decoration:none;color:#4c6b87}a:hover,a:focus{text-decoration:none;color:#bb7a2a}a:active{text-decoration:none;color:#4c6b87}a[name]{color:#353833}a[name]:hover{text-decoration:none;color:#353833}pre{font-size:1.3em}h1{font-size:1.8em}h2{font-size:1.5em}h3{font-size:1.4em}h4{font-size:1.3em}h5{font-size:1.2em}h6{font-size:1.1em}ul{list-style-type:disc}code,tt{font-size:1.2em}dt code{font-size:1.2em}table tr td dt code{font-size:1.2em;vertical-align:top}sup{font-size:.6em}.clear{clear:both;height:0;overflow:hidden}.aboutLanguage{float:right;padding:0 21px;font-size:.8em;z-index:200;margin-top:-7px}.legalCopy{margin-left:.5em}.bar a,.bar a:link,.bar a:visited,.bar a:active{color:#FFF;text-decoration:none}.bar a:hover,.bar a:focus{color:#bb7a2a}.tab{background-color:#06F;background-image:url(https://geofire-java.firebaseapp.com/docs/resources/titlebar.gif);background-position:left top;background-repeat:no-repeat;color:#fff;padding:8px;width:5em;font-weight:700}.bar{background-image:url(resources/background.gif);background-repeat:repeat-x;color:#FFF;padding:.8em .5em .4em .8em;height:auto;font-size:1em;margin:0}.topNav{background-image:url(resources/background.gif);background-repeat:repeat-x;color:#FFF;float:left;padding:0;width:100%;clear:right;height:2.8em;padding-top:10px;overflow:hidden}.bottomNav{margin-top:10px;background-image:url(resources/background.gif);background-repeat:repeat-x;color:#FFF;float:left;padding:0;width:100%;clear:right;height:2.8em;padding-top:10px;overflow:hidden}.subNav{background-color:#dee3e9;border-bottom:1px solid #9eadc0;float:left;width:100%;overflow:hidden}.subNav div{clear:left;float:left;padding:0 0 5px 6px}ul.navList,ul.subNavList{float:left;margin:0 25px 0 0;padding:0}ul.navList li{list-style:none;float:left;padding:3px 6px}ul.subNavList li{list-style:none;float:left;font-size:90%}.topNav a:link,.topNav a:active,.topNav a:visited,.bottomNav a:link,.bottomNav a:active,.bottomNav a:visited{color:#FFF;text-decoration:none}.topNav a:hover,.bottomNav a:hover{text-decoration:none;color:#bb7a2a}.navBarCell1Rev{background-image:url(resources/tab.gif);background-color:#a88834;color:#FFF;margin:auto 5px;border:1px solid #c9aa44}.header,.footer{clear:both;margin:0 20px;padding:5px 0 0 0}.indexHeader{margin:10px;position:relative}.indexHeader h1{font-size:1.3em}.title{color:#2c4557;margin:10px 0}.subTitle{margin:5px 0 0 0}.header ul{margin:0 0 25px 0;padding:0}.footer ul{margin:20px 0 5px 0}.header ul li,.footer ul li{list-style:none;font-size:1.2em}div.details ul.blockList ul.blockList ul.blockList li.blockList h4,div.details ul.blockList ul.blockList ul.blockListLast li.blockList h4{background-color:#dee3e9;border-top:1px solid #9eadc0;border-bottom:1px solid #9eadc0;margin:0 0 6px -8px;padding:2px 5px}ul.blockList ul.blockList ul.blockList li.blockList h3{background-color:#dee3e9;border-top:1px solid #9eadc0;border-bottom:1px solid #9eadc0;margin:0 0 6px -8px;padding:2px 5px}ul.blockList ul.blockList li.blockList h3{padding:0;margin:15px 0}ul.blockList li.blockList h2{padding:0 0 20px 0}.contentContainer,.sourceContainer,.classUseContainer,.serializedFormContainer,.constantValuesContainer{clear:both;padding:10px 20px;position:relative}.indexContainer{margin:10px;position:relative;font-size:1em}.indexContainer h2{font-size:1.1em;padding:0 0 3px 0}.indexContainer ul{margin:0;padding:0}.indexContainer ul li{list-style:none}.contentContainer .description dl dt,.contentContainer .details dl dt,.serializedFormContainer dl dt{font-size:1.1em;font-weight:700;margin:10px 0 0 0;color:#4E4E4E}.contentContainer .description dl dd,.contentContainer .details dl dd,.serializedFormContainer dl dd{margin:10px 0 10px 20px}.serializedFormContainer dl.nameValue dt{margin-left:1px;font-size:1.1em;display:inline;font-weight:700}.serializedFormContainer dl.nameValue dd{margin:0 0 0 1px;font-size:1.1em;display:inline}ul.horizontal li{display:inline;font-size:.9em}ul.inheritance{margin:0;padding:0}ul.inheritance li{display:inline;list-style:none}ul.inheritance li ul.inheritance{margin-left:15px;padding-left:15px;padding-top:1px}ul.blockList,ul.blockListLast{margin:10px 0 10px 0;padding:0}ul.blockList li.blockList,ul.blockListLast li.blockList{list-style:none;margin-bottom:25px}ul.blockList ul.blockList li.blockList,ul.blockList ul.blockListLast li.blockList{padding:0 20px 5px 10px;border:1px solid #9eadc0;background-color:#f9f9f9}ul.blockList ul.blockList ul.blockList li.blockList,ul.blockList ul.blockList ul.blockListLast li.blockList{padding:0 0 5px 8px;background-color:#fff;border:1px solid #9eadc0;border-top:none}ul.blockList ul.blockList ul.blockList ul.blockList li.blockList{margin-left:0;padding-left:0;padding-bottom:15px;border:none;border-bottom:1px solid #9eadc0}ul.blockList ul.blockList ul.blockList ul.blockList li.blockListLast{list-style:none;border-bottom:none;padding-bottom:0}table tr td dl,table tr td dl dt,table tr td dl dd{margin-top:0;margin-bottom:1px}.contentContainer table,.classUseContainer table,.constantValuesContainer table{border-bottom:1px solid #9eadc0;width:100%}.contentContainer ul li table,.classUseContainer ul li table,.constantValuesContainer ul li table{width:100%}.contentContainer .description table,.contentContainer .details table{border-bottom:none}.contentContainer ul li table th.colOne,.contentContainer ul li table th.colFirst,.contentContainer ul li table th.colLast,.classUseContainer ul li table th,.constantValuesContainer ul li table th,.contentContainer ul li table td.colOne,.contentContainer ul li table td.colFirst,.contentContainer ul li table td.colLast,.classUseContainer ul li table td,.constantValuesContainer ul li table td{vertical-align:top;padding-right:20px}.contentContainer ul li table th.colLast,.classUseContainer ul li table th.colLast,.constantValuesContainer ul li table th.colLast,.contentContainer ul li table td.colLast,.classUseContainer ul li table td.colLast,.constantValuesContainer ul li table td.colLast,.contentContainer ul li table th.colOne,.classUseContainer ul li table th.colOne,.contentContainer ul li table td.colOne,.classUseContainer ul li table td.colOne{padding-right:3px}.overviewSummary caption,.packageSummary caption,.contentContainer ul.blockList li.blockList caption,.summary caption,.classUseContainer caption,.constantValuesContainer caption{position:relative;text-align:left;background-repeat:no-repeat;color:#FFF;font-weight:700;clear:none;overflow:hidden;padding:0;margin:0}caption a:link,caption a:hover,caption a:active,caption a:visited{color:#FFF}.overviewSummary caption span,.packageSummary caption span,.contentContainer ul.blockList li.blockList caption span,.summary caption span,.classUseContainer caption span,.constantValuesContainer caption span{white-space:nowrap;padding-top:8px;padding-left:8px;display:block;float:left;background-image:url(https://geofire-java.firebaseapp.com/docs/resources/titlebar.gif);height:18px}.overviewSummary .tabEnd,.packageSummary .tabEnd,.contentContainer ul.blockList li.blockList .tabEnd,.summary .tabEnd,.classUseContainer .tabEnd,.constantValuesContainer .tabEnd{width:10px;background-image:url(https://geofire-java.firebaseapp.com/docs/resources/titlebar_end.gif);background-repeat:no-repeat;background-position:top right;position:relative;float:left}ul.blockList ul.blockList li.blockList table{margin:0 0 12px 0;width:100%}.tableSubHeadingColor{background-color:#EEF}.altColor{background-color:#eeeeef}.rowColor{background-color:#fff}.overviewSummary td,.packageSummary td,.contentContainer ul.blockList li.blockList td,.summary td,.classUseContainer td,.constantValuesContainer td{text-align:left;padding:3px 3px 3px 7px}th.colFirst,th.colLast,th.colOne,.constantValuesContainer th{background:#dee3e9;border-top:1px solid #9eadc0;border-bottom:1px solid #9eadc0;text-align:left;padding:3px 3px 3px 7px}td.colOne a:link,td.colOne a:active,td.colOne a:visited,td.colOne a:hover,td.colFirst a:link,td.colFirst a:active,td.colFirst a:visited,td.colFirst a:hover,td.colLast a:link,td.colLast a:active,td.colLast a:visited,td.colLast a:hover,.constantValuesContainer td a:link,.constantValuesContainer td a:active,.constantValuesContainer td a:visited,.constantValuesContainer td a:hover{font-weight:700}td.colFirst,th.colFirst{border-left:1px solid #9eadc0;white-space:nowrap}td.colLast,th.colLast{border-right:1px solid #9eadc0}td.colOne,th.colOne{border-right:1px solid #9eadc0;border-left:1px solid #9eadc0}table.overviewSummary{padding:0;margin-left:0}table.overviewSummary td.colFirst,table.overviewSummary th.colFirst,table.overviewSummary td.colOne,table.overviewSummary th.colOne{width:25%;vertical-align:middle}table.packageSummary td.colFirst,table.overviewSummary th.colFirst{width:25%;vertical-align:middle}.description pre{margin-top:0}.deprecatedContent{margin:0;padding:10px 0}.docSummary{padding:0}.sourceLineNo{color:green;padding:0 30px 0 0}h1.hidden{visibility:hidden;overflow:hidden;font-size:.9em}.block{display:block;margin:3px 0 0 0}.strong{font-weight:700}
      </style>
    </head>
  <body>
    <h2 title="${file.name}" class="title">${file.name}</h2>
    <p>${file.description}</p>
    <span>Author: <a href="#">${file.author}</a></p>
    <ul class="blockList">
      <li class="blockList">
        <a name="method_summary">
          <!--   -->
        </a>
        <h3>Method Summary</h3>
        <table class="overviewSummary" border="0" cellpadding="3" cellspacing="0" summary="Method Summary table, listing methods, and an explanation">
          <caption><span>Methods</span><span class="tabEnd">&nbsp;</span></caption>
          <tbody>
            <tr>
              <th class="colFirst" scope="col">Returns</th>
              <th class="colLast" scope="col">Method and Description</th>
            </tr>
            ${functions.map((fn, i) =>
              `<tr class="${i % 2 === 0 ? 'rowColor' : 'altColor'}">
                <td class="colFirst">
                  <code>${fn.returns}</code>
                </td>
                <td class="colLast">
                  <code>
                    <strong>
                      <a href="#">${fn.method}(${fn.params && fn.params.join(', ')})</a>
                    </strong>
                  </code>
                  <div class="block">${fn.description}</div>
                </td>
              </tr>`
            ).join('')}
          </tbody>
        </table>
      </li>
    </ul>
  </body>
  </html>
`;
}