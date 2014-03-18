AddressSchema = new SimpleSchema({
  street: {
    type: String,
    label: "Street",
    max: 100
  },
  suite: {
    type: String,
    label: "Suite",
    optional: true,
    max: 100
  },
  city: {
    type: String,
    label: "City",
    max: 50
  },
  state: {
    type: String,
    label: "State",
    regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
  },
  zip: {
    type: String,
    label: "Zip",
    regEx: /^[0-9]{5}$/
  }
});

clientPersonsSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Client name",
		max: 100
	},
	email: {
		type: String,
		label: "Client email",
		regEx: SimpleSchema.RegEx.Email,
		max: 60,
		optional: true
	},
		title: {
		type: String,
		label: "Title or position",
		max: 100,
		optional: true
	},
	phone: {
		type: String,
		label: "Phone",
		max: 25,
		optional: true
	}
});

teamMemberSchema = new SimpleSchema({
	name: {
		type: String,
		max: 100
	},
	userId: {
		type: String
	},
	roleType: {
		type: String,
		label: "Role of Team Member",
		allowedValues: ["leader", "sales lead", "sale", "team member", "house", "support", "other"]
	},
	allocation: {
		type: Number,
		decimal: true,
		optional: true
	}
});

Contracts = new Meteor.Collection("Contracts",{
	 schema: new SimpleSchema({
        contractName: {
            type: String,
            label: "Contract Name",
            max: 60
        },
        clientCompanyName: {
            type: String,
            label: "Company Name",
            max:60
        },
        clientPersons: {	
            type: [clientPersonsSchema],
            label: "Client Person", 
            maxCount: 30
        },
        billingAddress: {
            type: AddressSchema,
            label: "Billing Address"
        }, 
        monthlyRevenue: {
            type: Number,
            decimal: true,
            label: "Estimate of Monthly Revenue"
        },
        startDate: {
            type: Date,
            label: "Start Date"
        },
        endDate: {
            type: Date,
            label: "End Date"
        },
        teamMember: {
        	type: [teamMemberSchema],
        	label: "Team Member",
        } 
   	})
});
