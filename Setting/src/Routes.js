const Routes = [
  { method: 'get', path: '/Cases/GetCompleteCase', controller: 'Case', action: 'GetCompleteCase' },
  { method: 'get', path: '/Cases/GetDeactivateCase', controller: 'Case', action: 'GetDeactivateCase' },
  { method: 'get', path: '/Cases/:caseId', controller: 'Case', action: 'GetCase' },
  { method: 'get', path: '/Cases', controller: 'Case', action: 'GetCases' },
  { method: 'post', path: '/Cases', controller: 'Case', action: 'AddCase' },
  { method: 'put', path: '/Cases', controller: 'Case', action: 'UpdateCase' },
  { method: 'delete', path: '/Cases/:caseId', controller: 'Case', action: 'DeleteCase' },

  { method: 'get', path: '/Costumertypes/:costumertypeId', controller: 'Costumertype', action: 'GetCostumertype' },
  { method: 'get', path: '/Costumertypes', controller: 'Costumertype', action: 'GetCostumertypes' },
  { method: 'post', path: '/Costumertypes', controller: 'Costumertype', action: 'AddCostumertype' },
  { method: 'put', path: '/Costumertypes', controller: 'Costumertype', action: 'UpdateCostumertype' },
  { method: 'delete', path: '/Costumertypes/:costumertypeId', controller: 'Costumertype', action: 'DeleteCostumertype' },

  { method: 'get', path: '/Departments/:departmentId', controller: 'Department', action: 'GetDepartment' },
  { method: 'get', path: '/Departments', controller: 'Department', action: 'GetDepartments' },
  { method: 'post', path: '/Departments', controller: 'Department', action: 'AddDepartment' },
  { method: 'put', path: '/Departments', controller: 'Department', action: 'UpdateDepartment' },
  { method: 'delete', path: '/Departments/:departmentId', controller: 'Department', action: 'DeleteDepartment' },

]

module.exports = Routes