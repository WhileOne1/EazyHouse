const { ApolloServer,makeExecutableSchema  } = require('apollo-server');
const api = require('./server/api');
const {Client} = require('pg');
const bodyParser = require('body-parser');
const typeDefs = require('./server/schema');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
//Database
 const sequelize = require('./server/config/database');
const ThermometerModel = require('./server/newmodels/Thermometer');
const SwitchModel = require('./server/newmodels/Switch');
const SwitchWithValueModel = require('./server/newmodels/SwitchWithValue');
const FridgeModel = require('./server/newmodels/Fridge');
const UserModel = require('./server/newmodels/User');
const DeviceModel = require('./server/newmodels/Device');
//const { FORCE } = require('sequelize/types/lib/index-hints');

SwitchModel.belongsTo(DeviceModel, { foreignKey: 'deviceid' })
ThermometerModel.belongsTo(DeviceModel, { foreignKey: 'deviceid' })
FridgeModel.belongsTo(DeviceModel, { foreignKey: 'deviceid' })
SwitchWithValueModel.belongsTo(DeviceModel, { foreignKey: 'deviceid' })
UserModel.hasMany(DeviceModel); 
//DeviceModel.belongsTo(UserModel)

const SECRET = 'dsjklgfdgsfdjklgnfdjgkdngjd1q234j234n34j1';
const SECRET2 = 'dsjklgfdgsfdjklgnfdjgkdngjd1q234j234n34j1dsgdfgsdfds';

const createAdmin = async (UserModel) => {
  const hashedPassword = await bcrypt.hash('admin',12);
  UserModel.create({email:'admin@example.com',username:'admin',password: hashedPassword});
}
sequelize.sync( {force: true} );
sequelize.authenticate()
    .then(() => {{console.log('db connected'), createAdmin(UserModel)}})
    .catch(err => console.log(err)) 
sequelize.sequelize = sequelize;
sequelize.Sequelize = Sequelize;

const formatErrors = (e) => {
  if (e instanceof sequelize.Sequelize.ValidationError) {
    return e.errors.map(x=> _.pick(x,['path','message']));
  }
  return [{path: 'name', message: 'something went wrong'}];
}
const createTokens = async (user, secret, secret2) => {
  const createToken = jwt.sign(
    {
      user: _.pick(user, ['id']),
    },
    secret,
    {
      expiresIn: '1h',
    },
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, 'id'),
    },
    secret2,
    {
      expiresIn: '7d',
    },
  );

  return [createToken, createRefreshToken];
};

const refreshTokens = async (token, refreshTokenF) => {
  let userId = -1;
  try {
    const { user: { id } } = jwt.decode(refreshToken);
    userId = id;
  } catch (err) {
    return {};
  }

  if (!userId) {
    return {};
  }

  const user = await UserModel.findOne({ where: { id: userId }, raw: true });

  if (!user) {
    return {};
  }

  try {
    jwt.verify(refreshToken, user.refreshSecret);
  } catch (err) {
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(user, SECRET, user.refreshSecret);
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};
const resolvers = {
    Query: {
        
        
        thermometers: () => ThermometerModel.findAll({include:[  DeviceModel ]}),
        switches: () => SwitchModel.findAll({include:[  DeviceModel ]}),
        fridges: () => FridgeModel.findAll({include:[  DeviceModel ]}),
        devices: () => DeviceModel.findAll({}),
        switchesWithValues: () => SwitchWithValueModel.findAll({include:[  DeviceModel ]}),
        distinctRoom: () => DeviceModel.findAll({attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('room')) ,'room'], ]}),
        devicesbyroom: (parent, {room}) =>DeviceModel.findAll({ where: {room: room} }),
        thermometersbyroom: (parent, {room}) => ThermometerModel.findAll({include:[  {model:DeviceModel ,where: {room: room}} ]}),
        switchesbyroom: (parent, {room}) =>SwitchModel.findAll({include:[  {model:DeviceModel ,where: {room: room}} ]}),
        fridgesbyroom: (parent, {room}) => FridgeModel.findAll({include:[  {model:DeviceModel,where: {room: room}} ]}),
        switchesWithValuesbyroom: (parent, {room}) => SwitchWithValueModel.findAll({include:[  {model:DeviceModel,where: {room: room}} ]}),
        
    },
    Mutation: {
      createDevice: async (parent, {deviceid}) => {
        const data = {
            status:true, 
            name: 'nowe urządzenie', 
            room: 'brak przypisania'
        }
        console.log(deviceid)
        let {status,name,room,}= data;
          
          DeviceModel.create({
            
            name, 
            status, 
            room,
            deviceid
          }) 

    },
    deleteDevice: async (parent, {deviceid}) => {
        SwitchModel.destroy({where : {deviceid: deviceid}}) 
        FridgeModel.destroy({where : {deviceid: deviceid}}) 
        ThermometerModel.destroy({where : {deviceid: deviceid}}) 
        DeviceModel.destroy({where : {deviceid: deviceid}})
        SwitchWithValueModel.destroy({where : {deviceid: deviceid}}) 

  },
    editDevice: async (parent, {deviceid,name}) => {
          DeviceModel.update(
            { name: name },
            { where: { deviceid: deviceid } }
          )

    },
    editDeviceRoom: async (parent, {deviceid,room}) => {
      DeviceModel.update(
        { room: room },
        { where: { deviceid: deviceid } }
      )

    },
    register: async (parent,{password, username,email}) => {
      try{
        if(username.length < 3 || username.length > 25){
          return {
            ok: false,
            errors:[{
              path: 'username',
              message: 'username must be between 3 and 25 characters long'
            }]
          }
        }
        if(password.length < 5 || username.length > 100){
          return {
            ok: false,
            errors:[{
              path: 'password',
              message: 'password must be between 5 and 100 characters long'
            }]
          }
        }
      
      hashedPassword = await bcrypt.hash(password,12);
       const user = await UserModel.create({email,username,password: hashedPassword});
       return {
         ok: true,
         user,

       }
      }catch (err) {
        return {
          ok: false,
          errors: formatErrors(err),
        }
      }

    },
    login: async (parent,{email,password}) => {
      const user = await UserModel.findOne({ where: { email }, raw: true });
      if (!user) {
        // user with provided email not found
        return {
          ok: false,
          errors: [{ path: 'email', message: 'Wrong email' }],
        };
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        // bad password
        return {
          ok: false,
          errors: [{ path: 'password', message: 'Wrong password' }],
        };
      }

      const refreshTokenSecret = user.password + SECRET2;

      const [token, refreshToken] = await createTokens(user, SECRET, refreshTokenSecret);

      return {
        ok: true,
        token,
        refreshToken,
      };

    }

    }
};
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    inheritResolversFromInterfaces: true,
  });


const server = new ApolloServer({ schema });
//socket.io
const io = require('socket.io')(2000)


const devicesId = {}
function isDeviceIdUnique (deviceid) {
  return DeviceModel.count({ where: { deviceid: deviceid  } })
    .then(count => {
      if (count != 0) {
        return false;
      }
      return true;
  });
}

io.on('connection', socket => {
    socket.on('check-id', ( {deviceid} ) => {

        devicesId[socket.id] = deviceid
        console.log(`${deviceid}`);
        
        isDeviceIdUnique(deviceid).then(isUnique =>{
                if (isUnique){
                    socket.emit('new-id', deviceid)
                    console.log(`${deviceid}`);
                }
                else
                {
                    socket.emit('old-id', deviceid)
                }
            })
            
        
    

    })
    socket.on('test', () => {            
         console.log(`działa`);
    })


    socket.on('old-device', ( deviceid ) => {
        
            console.log(`urządzenie o podanym id już istnieje`);
            DeviceModel.update(
                { status: true },
                { where: { deviceid: deviceid  } }
              )

    })
    socket.on('add-device', ({ deviceid,type }) => {
            const device = {name:'Nowe Urządzenie', status:true, room:'nie przypisano'}
            let{name,status,room}= device
              if(type == 'thermometer')
              {
                DeviceModel.create({
                
                  name, 
                  status,
                  room,
                  deviceid
                }).then(() =>{
                  ThermometerModel.create(
                    {deviceid}
                  )})
              }
              if(type == 'switch')
              {
                DeviceModel.create({
                
                  name, 
                  status,
                  room,
                  deviceid
                }).then(() =>{
                  SwitchModel.create(
                    {deviceid}
                  )})
                 
              }
              if(type == 'fridge')
              {
                DeviceModel.create({
                
                  name, 
                  status,
                  room,
                  deviceid
                }).then(() =>{
                  FridgeModel.create(
                    {deviceid}
                  )})
              }
              if(type == 'switchwithvalue')
              {
                DeviceModel.create({
                
                  name, 
                  status,
                  room,
                  deviceid
                }).then(() =>{
                  SwitchWithValueModel.create(
                    {deviceid}
                  )
                })
              }
            
    })
    //thermometer
    socket.on('send-thermometer-value', ({deviceid, value,valueType}) => {
      console.log(`${valueType}`);
        ThermometerModel.update(
            { value: value ,valueType: valueType },
            { where: { deviceid: deviceid  } }
          )
    })
//Switch
        socket.on('send-switch-value', ({deviceid , value}) => {
            SwitchModel.update(
                { isOn: value },
                { where: { deviceid: deviceid  } }
              )
        })
        socket.on('change-switch-value', ({id1, isOn}) => {
            console.log(`${id1}`);
            socket.broadcast.emit('value',{id1,isOn})
        })
//*Switch
//Fridge
            socket.on('send-fridge-value', ({deviceid , value,valueType}) => {
              console.log(`${valueType}`);
                FridgeModel.update(
                    { value: value,valueType: valueType },
                    { where: { deviceid: deviceid  } }
                  )
            })
            socket.on('change-fridge-value', ({id1, value}) => {
                console.log(`${id1}`);
                socket.broadcast.emit('fridge-value',{id1,value})
            })
//*Fridge
//SwitchwithValue
socket.on('send-switchwithvalue-value', ({deviceid , value,value2,valueType}) => {
  console.log(`${value2}`);
    SwitchWithValueModel.update(
        {isOn: value, value: value2,valueType: valueType,  },
        { where: { deviceid: deviceid  } }
      )
})
socket.on('change-switchwithvalue-value', ({id1, value2}) => {
  console.log(`${id1}`);
  socket.broadcast.emit('switchwithvalue-value',{id1,value2})
})
//*SwitchwithValue

    socket.on('disconnect', () => {
        DeviceModel.update(
            { status: false },
            { where: { deviceid: devicesId[socket.id]  } }
          )
        delete devicesId[socket.id]
    })
})
//models.sequelize.sync().then(() => d{
server.listen().then(({ url }) => {
    console.log(`server listen at ${url}`);
    
})
//})

