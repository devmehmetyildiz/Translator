const Routes = [
    { method: 'get', path: '/Jobs/GetbyorderID/:orderId', controller: 'Job', action: 'GetbyorderID' },
    { method: 'get', path: '/Jobs/:jobId', controller: 'Job', action: 'GetJob' },
    { method: 'get', path: '/Jobs', controller: 'Job', action: 'GetJobs' },
    { method: 'post', path: '/Jobs', controller: 'Job', action: 'AddJobs' },
    { method: 'put', path: '/Jobs', controller: 'Job', action: 'UpdateJobs' },
    { method: 'delete', path: '/Jobs/:jobId', controller: 'Job', action: 'DeleteJobs' },

    { method: 'get', path: '/Orders/:orderId', controller: 'Order', action: 'GetOrder' },
    { method: 'get', path: '/Orders', controller: 'Order', action: 'GetOrders' },
    { method: 'post', path: '/Orders', controller: 'Order', action: 'AddOrders' },
    { method: 'put', path: '/Orders', controller: 'Order', action: 'UpdateOrders' },
    { method: 'delete', path: '/Orders/:orderId', controller: 'Order', action: 'DeleteOrders' },
]

module.exports = Routes