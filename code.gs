function getMyFilesFromDrive() {
 var wf = DriveApp.getFolderById("1QuQJ6TZI6diiJwwGMFB0yxhY5wMocIck");
 var myFiles = wf.searchFiles('');
 var myFolders = wf.searchFolders('');
 var sheet = SpreadsheetApp.getActive().getSheetByName("File List");
 sheet.clear();
 var rows = [];
 rows.push(["Name", "Url"]);
 while(myFiles.hasNext()) {
   var file = myFiles.next();
   if(file != null) {
     rows.push([file.getName(), file.getUrl()]);
   }
 }
 while(myFolders.hasNext()) {
   var folder = myFolders.next();
   if(folder != null) {
     rows.push([folder.getName(), folder.getUrl()]);

     var myFilesInFolder = folder.searchFiles('');
     while(myFilesInFolder.hasNext()) {
      var fileInFolder = myFilesInFolder.next();
      if(fileInFolder != null) {
        rows.push([fileInFolder.getName(), fileInFolder.getUrl()]);
      }
     }
   }
 }
 sheet.getRange(1,1,rows.length,2).setValues(rows);
}
