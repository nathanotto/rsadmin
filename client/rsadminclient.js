
Handlebars.registerHelper('addContract', function(input) {
        return Session.get("addContract");
});

Handlebars.registerHelper("teamRoleOptions", function() {
    return [
        {label: "Leader", value: 'leader'},
        {label: "Sales lead", value: 'sales lead'},
        {label: "Sale", value: 'sale'},
        {label: "Team member", value: 'team member'},
        {label: "House", value: 'house'},
        {label: "Support", value: 'support'},
        {label: "Other", value: 'other'}
    ];
});

Handlebars.registerHelper("currentUserEmail", function() {
  var user = Meteor.user();
  if (user && user.emails)
    return user.emails[0].address;
});

Template.buttonbar.events({
	'click a.add_contract' : function(event) {
		event.preventDefault();
			if (Meteor.userId()){
			// document.write("Clicked Add Contract");
			Session.set('addContract', true);
	}
   }
});

Template.contracts.contract_items = function (){
	//Note this will become a more sophisticated search that looks for currentUser on the Team, role and allocation
	//Also specifying which info to return from Contracts, since they will get quite large.
	return Contracts.find({},{sort:{'submittedOn':-1}}); 
};

Template.contract.events({
	'click' : function () {
		Session.set("selected_contract", this._id)
	},
	
	//Handle detail and team links
	'click a.detail' : function(event){
		event.preventDefault();
		if (Meteor.userId()){
			var contractId = Session.get("selected_contract");
			Session.set("contractDetail", true); //will be used to toggle between contract detail view and list view
		}
	},

	'click a.team' : function(event){
		event.preventDefault();
		if (Meteor.userId()){
			var contractId = Session.get("selected_contract");
			Session.set("showTeam", true); //pops up a list of Team members

		}
	}
})

/* Template.insertContractForm.ContractsCollection = function () {
	Session.set("addContract", false);
    return Contracts;

}; */

Template.insertContractForm.events({
	'click a.cancel' : function(event){
		event.preventDefault();
		if (Meteor.userId()){
			Session.set("addContract", false);
		}
	},

	/* 'click a.add-contract' : function(event){
		event.preventDefault();
		if (Meteor.userId()){
			var contractName = document.getElementById("contractName").value;
			var clientCompanyName = document.getElementById("clientCompanyName").value;
			var clientContactName = document.getElementById("clientContactName").value;
			var clientEmail = document.getElementById("clientEmail").value;
			var billingAddress = document.getElementById("billingAddress").value;
			var monthlyRevenue = document.getElementById("monthlyRevenue").value;
			var startDate = document.getElementById("startDate").value;
			var endDate = document.getElementById("endDate").value;
			var contractFile = document.getElementById("contractFile").value; //upload copy of contract
			// need to add Team members as users plus process for inviting a team member with an email
			// need to add client people and billing address
			Meteor.call("addContract", contractName, clientCompanyName, clientContactName, clientEmail, billingAddress, monthlyRevenue, startDate, endDate, contractFile, function(error , contractId){
				console.log('added contract with Id .. '+ contractId);
			});
			var contractName = document.getElementById("contractName").value = "";
			var clientCompanyName = document.getElementById("clientCompanyName").value = "";
			var clientContactName = document.getElementById("clientContactName").value = "";
			var monthlyRevenue = document.getElementById("monthlyRevenue").value = "";
			var startDate = document.getElementById("startDate").value = "";
			var endDate = document.getElementById("endDate").value = "";
			var clientEmail = document.getElementById("clientEmail").value = "";
			var contractFile = document.getElementById("contractFile").value = "";
			var monthlyRevenue = document.getElementById("monthlyRevenue").value = "";
		}; 
		Session.set("addContract", false);
	} */
})




