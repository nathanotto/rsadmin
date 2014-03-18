
Handlebars.registerHelper('addContract', function(input) {
        return Session.get("addContract");
});

Handlebars.registerHelper('contractDetail', function(input) {
        return Session.get("contractDetail");
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
	
	'click a.detail' : function(event){
		event.preventDefault();
		if (Meteor.userId()){
			var contract_item = Contracts.findOne({_id : Session.get("selected_contract")});
			var contract_leader = "Leader Placeholder"; //search array teamMembers in contract_get to find roleType = "leader"
			contract_item.startDate = moment.utc(contract_item.startDate).format("LL");
			contract_item.endDate = moment.utc(contract_item.endDate).format("LL");
			Session.set("contract_item", contract_item);
			Session.set("contract_leader", contract_leader);
			Session.set("contractDetail", true); //used to toggle between contract detail view and list view, has registeHelper
		}
	},

});

Template.insertContractForm.events({
	'click a.cancel' : function(event){
		event.preventDefault();
		if (Meteor.userId()){
			Session.set("addContract", false);
		}
	}

});

Template.contract_detail.contract_item = function() {
	return Session.get("contract_item")
};

Template.contract_detail.contract_leader = function() {
	return Session.get("contract_leader");
};

Template.contract_detail.events({
	'click a.cancel' : function(event) {
		event.preventDefault();
		Session.set('contractDetail', false);
	}
});




