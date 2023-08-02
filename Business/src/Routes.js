const Routes = [
    { method: 'get', path: '/Jobs/GetCount', controller: 'Job', action: 'GetJobscount' },
    { method: 'get', path: '/Jobs/Getjobpricewithdocumentlanguage', controller: 'Job', action: 'Getjobpricewithdocumentlanguage' },
    { method: 'get', path: '/Jobs/GetbyorderID/:orderId', controller: 'Job', action: 'GetbyorderID' },
    { method: 'get', path: '/Jobs/:jobId', controller: 'Job', action: 'GetJob' },
    { method: 'get', path: '/Jobs', controller: 'Job', action: 'GetJobs' },
    { method: 'post', path: '/Jobs', controller: 'Job', action: 'AddJobs' },
    { method: 'put', path: '/Jobs', controller: 'Job', action: 'UpdateJobs' },
    { method: 'delete', path: '/Jobs/:jobId', controller: 'Job', action: 'DeleteJobs' },

    { method: 'get', path: '/Orders/GetOrderswithdate', controller: 'Order', action: 'GetOrderswithdate' },
    { method: 'get', path: '/Orders/GetOrdersforchart', controller: 'Order', action: 'GetOrdersforchart' },
    { method: 'get', path: '/Orders/GetCount', controller: 'Order', action: 'GetOrderscount' },
    { method: 'get', path: '/Orders/GetPricenet', controller: 'Order', action: 'GetPricenet' },
    { method: 'get', path: '/Orders/GetPricepotancial', controller: 'Order', action: 'GetPricepotancial' },
    { method: 'get', path: '/Orders/GetPricereal', controller: 'Order', action: 'GetPricereal' },
    { method: 'get', path: '/Orders/GetPriceexpence', controller: 'Order', action: 'GetPriceexpence' },
    { method: 'get', path: '/Orders/GetOrdercountbydate', controller: 'Order', action: 'GetOrdercountbydate' },
    { method: 'get', path: '/Orders/GetOrdercountwithjob', controller: 'Order', action: 'GetOrdercountwithjob' },
    { method: 'get', path: '/Orders/:orderId', controller: 'Order', action: 'GetOrder' },
    { method: 'get', path: '/Orders', controller: 'Order', action: 'GetOrders' },
    { method: 'post', path: '/Orders', controller: 'Order', action: 'AddOrders' },
    { method: 'put', path: '/Orders', controller: 'Order', action: 'UpdateOrders' },
    { method: 'delete', path: '/Orders/:orderId', controller: 'Order', action: 'DeleteOrders' },
]

module.exports = Routes