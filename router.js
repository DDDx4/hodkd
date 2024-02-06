const express = require('express')
const router = express.Router()
const mangadb = require('./sql/mangaDB.js')

// อัปโหลดไฟล์ multer
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/images/manga')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+".jpg")
    }
})

const upload = multer({
    storage:storage
})


router.get('/',(req,res)=>{
    mangadb.find().then((doc)=>{
        res.render('index.ejs',{manga:doc})
    })
})

router.get('/pagemanga/:id',(req,res)=>{
    mangadb.findOne({_id:req.params.id}).then((doc)=>{
        res.render('pangmanga.ejs',{manga:doc})
    }).catch(err => console.log(err))
})

router.get('/form',(req,res)=>{
    res.render('form.ejs')
})

router.post('/insert',upload.single("imagetitle"),(req,res)=>{
    const doc = new mangadb({
        title:req.body.title,
        imagetitle:req.file.filename,
        synopsis:req.body.synopsis
    })
    mangadb.savemanga(doc)
    res.redirect('/')
})

router.get('/manage',(req,res)=>{
    mangadb.find().then((doc)=>{
    res.render('manage.ejs',{manga:doc})
    })
})

router.get('/delete/:id',(req,res)=>{
    mangadb.findByIdAndDelete(req.params.id,{useFindAndModify:false}).then(()=>{
        res.redirect('/manage')
    })
})

router.post('/edit',(req,res)=>{
    mangadb.findOne({_id:req.body.mangaid},{useFindAndModify:false}).then((doc)=>{
        res.render('editmanga.ejs',{manga:doc})
    })
})

router.post('/update',(req,res)=>{
    const data = {
        title:req.body.title,
        synopsis:req.body.synopsis
    }
    mangadb.findByIdAndUpdate(req.body.mangaid,data,{useFindAndModify:false}).then(()=>{
        res.redirect('/manage')
    }) 
})


module.exports = router