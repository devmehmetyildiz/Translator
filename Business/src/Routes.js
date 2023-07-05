const Routes = [
    { method: 'get', path: '/Jobs/:jobId', controller: 'Job', action: 'GetJob' },
    { method: 'get', path: '/Jobs', controller: 'Job', action: 'GetJobs' },
    { method: 'post', path: '/Jobs', controller: 'Job', action: 'AddJobs' },
    { method: 'put', path: '/Jobs', controller: 'Job', action: 'UpdateJobs' },
    { method: 'delete', path: '/Jobs/:jobId', controller: 'Job', action: 'DeleteJobs' },

    { method: 'get', path: '/Orders/:orderId', controller: 'Order', action: 'GetOrder' },
    { method: 'get', path: '/Orders', controller: 'Order', action: 'GetOrders' },
    { method: 'post', path: '/Orders', controller: 'Order', action: 'AddOrder' },
    { method: 'put', path: '/Orders', controller: 'Order', action: 'UpdateOrder' },
    { method: 'delete', path: '/Orders/:orderId', controller: 'Order', action: 'DeleteOrder' },
]

module.exports = Routes