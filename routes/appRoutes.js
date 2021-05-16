const router = require('express').Router();
const User = require('../modals/User');
const Post = require('../modals/Post');

// home page
router.get('/:id',async (req,res)=>{
    const user = await User.findOne({_id:req.params.id});
    if(!user) return res.send("please login");
    const posts = await Post.find({});
    res.render('index',{posts,user});
})



// saving new post to database
router.post('/upload',async (req,res)=>{
    let post ={};
    if(req.files!=null) {
        post = new Post({
            user_id:req.body.user_id,
            desc:req.body.desc,
            img:req.files.img.data,
            imgType:req.files.img.mimetype
        })
    }else{
        post = new Post({
            user_id:req.body.user_id,
            desc:req.body.desc,
        })
    }
    
    const saved = await post.save();
    console.log('post saved');

    if(!saved){
        console.log('unable to save the post')
    }
    res.send("data recieved")
})

// profile page of user
router.get('/profile/:id',async(req,res)=>{
    let user =0;
    let nPosts = 0;
    let userPosts = 0;
    await User.findOne({_id:req.params.id},(err,u)=>{
        if(err) return res.send('you cannot access this page')
        user = u;
    });
    
    await Post.countDocuments({user_id:user._id},(err,c)=>{
        if(err) throw err;
        nPosts = c;
    });
    await Post.find({user_id:user._id},(err,posts)=>{
        if(err) throw err;
        userPosts = posts;
        res.render('profile',{user,nPosts,userPosts})
    })
    
})


// it handles the form to update the user's profile
router.put('/profileUpdate',(req,res)=>{
    User.findById(req.body.id, async (err, user)=>{

        if (err) throw err;

        if(req.body.bio!=undefined)
            user.bio = req.body.bio;

        if(req.files!=undefined){
            user.profileImg = req.files.profileImg.data;
            user.profileImgType = req.files.profileImg.mimetype;
        }
        await user.save();
        res.send('user updated')
      });
})

// delete route to delete all the posts of a user
router.delete('/deleteAll/:id',async(req,res)=>{
    await Post.deleteMany({user_id:req.params.id},(err,msg)=>{
        if(err) throw err;
        if(msg.ok==1)
            res.send("done")
        else res.send('not done')
    })
})

module.exports = router;