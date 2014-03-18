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

invoiceSchema = new SimpleSchema({
    userId: {       //records the userId of the person preparing the invoice
        type: String
    },
    invoiceNumber: {
        type: String, //We will set it to ContractName + integer number of invoices
        unique: true,
        max: 15
    },
    invoiceAmount: {
        type: Number,
        decimal: true,    
    },
    sentDate: {
        type: Date
    },
    dueDate: {
        type: Date
    },
    paid: {
        type: Boolean,
        optional: true
    }
});

expenseSchema = new SimpleSchema({
    userId: {
        type: String
    },
    expenseAmount: {
        type: Number,
        decimal: true
    },
    expenseType: {
        type: String,
        allowedValues: ["airfare", "hotel", "meals", "supplies", "ground transport", "other"]        
    },
    description: {
        type: String,
        optional: true,
        max: 300
    },
    houseExpense: {
        type: Boolean,  //used to mark expenses as payable by Rapid Scale rather than client
        optional: true
    },
    invoiceNumber: {  //used to indicate the expense has been rolled up into an invoice and billed
        type: String,
        optional: true,
        max: 15
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
	allocation: {          //Percentage allocation for this team member. Cannot exceed 100% over all team members
		type: Number,
		optional: true,
        min: 0,
        max: 100
	}
});

allocationAmountSchema = new SimpleSchema({
    userId: {               //Connects the user to the allocation amount
        type: String
    },
    dateAllocated: {
        type: Date
    },
    percentageActive: {
        type: Number,
        min: 0,
        max: 100
    },
    roleType: {
        type: String,
        label: "Role of Team Member",
        allowedValues: ["leader", "sales lead", "sale", "team member", "house", "support", "other"]
    },
    allocationAmount: {
        type: Number,
        decimal: true
    },
    paymentNumber: {
        type: String,  //connected to the Payments schema
        unique: true,
        max: 15
    },
    paidOn: {           //checked off when the payments are sent to consultant
        type: Date,
        optional: true
    }

});

paymentRecievedSchema = new SimpleSchema({
    amountPaid: {
        type: Number,
        decimal: true
    },
    dateReceived: {
        type: Date
    },
    invoiceNumber: {    //to match the payment to the invoice issued
        type: String,
        optional: true,
        max: 15
    },
    paymentNumber: {
        type: String,
        max: 15
    }
});

workPerformedSchema = new SimpleSchema({    //these logs will be put on invoices and used internally
    userId: {
        type: String
    },
    workType: {
        type: String,
        allowedValues: ["combination","coaching","meeting","facilitation","strategy","other"],
    },
    fromDate: {
        type: Date,
        label:"Word period from"
    },
    toDate: {
        type: Date,
        label: "Until"
    },
    description: {
        type: String,
        max: 300
    }
})

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
        },
        paymentsRecieved: {
            type: [paymentRecievedSchema],
            label: "Payments Recieved",
            optional: true
        },
        invoices: {
            type: [invoiceSchema],
            label: "Invoices",
            optional: true
        },
        expenses: {
            type: [expenseSchema],
            label: "Expenses",
            optional: true
        },
        allocations: {
            type: [allocationAmountSchema],
            label: "Allocations",
            optional: true
        },
        workPerformed: {
            type: [workPerformedSchema],
            label: "Work Logged",
            optional: true
        } 
   })
});
