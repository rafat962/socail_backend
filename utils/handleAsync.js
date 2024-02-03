


// ---------------------------- Curd operations ----------------------------
// -------------- get all posts --------------

exports.getAll = (model) =>{
    return async (req,res,next) =>{
        try{
            const query = {...req.query}
            const removefields = ['field','sort','page','limit']
            for(x of Object.keys(query)){
                if(removefields.includes(x)){
                    delete query[x]
                }
            }
            let finalpost = model.find(query)
            // sort
            if(req.query.sort){
                const sortBy = req.query.sort.replace(',',' ')
                finalpost = finalpost.sort(sortBy)
            }
            // field

            if(req.query.field){
                const sortBy = req.query.field.replace(',',' ')
                finalpost = finalpost.select(sortBy)
            }
            // paginations
            const page = +req.query.page
            const limit = +req.query.limit
            finalpost = finalpost.skip((page-1)*limit).limit(limit)
            const Posts = await finalpost
            res.status(400).json({
                status:'success',
                postsNums: Posts.length,
                Posts
            })
        }catch(err){
            res.status(404).json({
                status:'fail',
                message:err.message
            })
        }
    }
}


// -------------- get one posts --------------


exports.getOne = (model) =>{
    return async (req,res,next) =>{
        try{
            const Posts = await model.findById(req.params.id)
            res.status(200).json({
                status:'success',
                data:Posts
            })
        }catch(err){
            res.status(404).json({
                status:'fail',
                message:err.message
            })
        }
    }}


// -------------- CREATE --------------


exports.create = (model) =>{
    return async (req,res,next) =>{
    try{
        const Posts = await model.create(req.body)
        res.status(200).json({
            statu:'success',
            data:Posts
        })
    }catch(err){
        res.status(404).json({
            statu:'fail',
            message:err.message
        })
    }
}}

// -------------- DELETE --------------

exports.delete = (model) =>{
    return async (req,res,next) =>{
        try{
            const Posts = await model.findByIdAndDelete(req.params.id)
            res.status(200).json({
                statu:'deleted successfully'
            })
        }catch(err){
            res.status(404).json({
                status:'fail',
                message:err.message
            })
        }
    }}



// -------------- UPDATE --------------


exports.update = (model) =>{
    return async (req,res,next)=>{
        try{
            const updatedpost = await model.findByIdAndUpdate(req.params.id,req.body,{new:true})
            res.status(200).json({
                statu:'success',
                data:updatedpost
            })
        }catch(err){
            res.status(404).json({
                status:'fail',
                message:err.message
            })
        }

    }
}

