


 Meteor.methods({
 /* addContract : function(contractName, clientCompanyName, clientContactName, clientEmail, billingAddress, monthlyRevenue, startDate, endDate, contractFile){
    console.log('Adding Contract in server code');
    var contractId = Contracts.insert({
          'contractName' : contractName,
          'clientCompanyName' : clientCompanyName, // need to figure out how to insert subdocuments in one go
          'clientPerson' : {'name' : clientContactName, //also need to put currentUser in Team
          					'email' : clientEmail
          }, 
          'billingAddress' : billingAddress,
          'monthlyRevenue' : monthlyRevenue,
          'startDate' : startDate,
          'endDate' : endDate,
          // 'contractFile' : contractFile,
          'submittedOn': new Date(),
          'submittedBy' : Meteor.userId()
      });
    return contractId;
  } */
 })


