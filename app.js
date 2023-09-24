const express=require('express');
const app=express();
const fsService=require('./fs.service')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT=5001;
app.listen(PORT,()=>{
    console.log(`Server has successfully on PORT ${PORT}`)
})

app.get('/users',async (req,res)=>{
    const users=await fsService.reader()
    res.json(users);
});

app.post('/users',async (req, res)=>{
    try {
        const {name,email}=req.body;

        if (!name||name.length<3){
            throw new Error('Wrong name')
        }
        if (!email||!email.includes('@')){
            throw new Error ('Wrong email')
        }

        const users = await fsService.reader();
        const lastId=users[users.length-1].id
        const newUser={id: lastId+1,name,email}

        users.push(newUser)
        await fsService.writer(users)
        res.status(201).json(newUser)
    }catch (e){
        res.status(400).json(e.message)
    }



})

app.get('/users/:id',async (req,res)=>{
    const {id}=req.params
    const users=await fsService.reader()
    const user=users.find((user)=>user.id===Number(id))
    if (!user) {
        throw new Error('User not found');
    }
    res.json(user)
})

app.delete('/users/:id',async (req,res)=>{

    try {
        const {id}=req.params
        const users=await fsService.reader()
        const index = users.findIndex((user) => user.id === Number(id));
        if (index === -1) {
            throw new Error('User not found');
        }
        users.splice(index, 1);

        await fsService.writer(users);

        res.sendStatus(204);
    } catch (e) {
        res.status(404).json(e.message);
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email} = req.body;

        const users = await fsService.reader();
        const user = users.find((user) => user.id === Number(id));
        if (!user) {
            throw new Error('User not found');
        }

        user.email = email;
        user.name = name;

        await fsService.writer(users);

        res.status(201).json(user);
    } catch (e) {
        res.status(404).json(e.message);
    }
});

