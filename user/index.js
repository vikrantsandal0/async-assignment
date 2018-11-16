var userController     = require('./controller/userController');

app.post('/sign_up_waterfall',                    userController.customerSignup);
app.post('/user_login',                 userController.customerLogin);
app.post('/get_data_async_auto',         userController.getUserDataAuto);
app.post('get_data_async_await', userController.getUserDataAwait);
app.post('get_data_promise_coroutine', userController.getUserDataCoroutine);
app.post('get_data_promise', userController.getUserDataPromise);
app.post('promisifyAll', userController.readFsPromisify);
app.post('setImmediate', userController.setImmediate);
