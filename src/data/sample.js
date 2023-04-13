const donation = {
    monthly: false,
    project_id: null,
    project: null,
    donation_type_id:'',
    donation_type: null,
    amount: null,
    fixed_amount: null,
    qty: 1,
}

const donor = {
    title: "Mr",
    first_name: "Usman",
    last_name: "Ibraheem",
    address_line_1: "Address 1",
    address_line_2: "Address 2",
    address_line_3: null,
    city: "Phalia",
    post_code: "50430",
    country: "Pakistan",
    email: "usmanibrahim74@gmail.com",
    phone: "03056230514",
    reason: "lorem",
    notes: "lorem notes",
    gift_aid: true,
    payment_type: 'credit',
    date: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
    paper_copy: false,
    admin_fee: false,
    communication_preferences: ["SMS"],
    agree: true
}

const admin_fee = {
    category_id: 0,
    project_id: 0,
    donation_type_id:'',
    amount: null,
    monthly: false,
    fix_amount: 5,
    qty: 1,
    totalAmount: null,
    project: null
}

const paper_copy = {
    category_id: 0,
    project_id: 0,
    donation_type_id:'',
    amount: null,
    monthly: false,
    fix_amount: 5,
    qty: 1,
    totalAmount: null,
    project: null
}


export { donation,donor };
