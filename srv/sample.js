//Possible actions READ, CREATE, UPDATE, UPSERT, DELETE
// Before the action happens
this.before('READ', Books, async (req) => { })

//During action handling
this.on('READ', Books, async (req, next) => {
    return next()
})

// After action happens
this.after('READ', Books, async (books, req) => { })