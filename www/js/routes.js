angular.module('routes', [])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
	.state('login', {
	    url: '/login',
	    templateUrl: 'templates/login.html',
	    controller: 'loginCtrl'
	})
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'PlannerCtrl'
  })
  .state('app.calendario', {
    url: '/calendario',
    views: {
      'menuContent': {
        templateUrl: 'templates/calendario.html',
        controller: 'CalendasCtrl'
      }
    }
  })
  .state('app.perfil', {
    url: '/perfil',
    views: {
      'menuContent': {
        templateUrl: 'templates/perfil.html',
        controller: 'PerfilCtrl'
      }
    }
  })
  .state('app.eventos', {
    url: '/eventos',
    views: {
      'menuContent': {
         cache: false,       
        templateUrl: 'templates/eventos.html',
        controller: 'EvtsCtrl'
      }
    }
  })
  .state('app.eventounico', {
    url: '/eventounico',
    views: {
      'menuContent': {
        templateUrl: 'templates/the_event.html',
        controller: 'TheEvtCtrl'
      }
    }
  })
  .state('app.novoevento', {
    url: '/novoevento',
    views: {
      'menuContent': {
        cache: false,
        templateUrl: 'templates/new_event.html',
        controller: 'NewEvtCtrl'
      }
    }
  })
  .state('app.checklist', {
    url: '/checklist',
    views: {
      'menuContent': {
        templateUrl: 'templates/checklist.html',
        controller: 'ChecklistCtrl'
      }
    }
  })
  .state('app.listadecompras', {
    url: '/listadecompras',
    views: {
      'menuContent': {
        templateUrl: 'templates/shoplist.html',
        controller: 'ShopListCtrl'
      }
    }
  })
  .state('app.afazeres', {
    url: '/afazeres',
    views: {
      'menuContent': {
        templateUrl: 'templates/afazeres.html',
        controller: 'ToDoListCtrl'
      }
    }
  })
  .state('app.cronograma', {
    url: '/cronograma',
    views: {
      'menuContent': {
        templateUrl: 'templates/cronograma.html',
        controller: 'ChronoCtrl'
      }
    }
  })
  .state('app.receitas_despesas', {
    url: '/receitas_despesas',
    views: {
      'menuContent': {
        templateUrl: 'templates/receitas_despesas.html',
        controller: 'BillsCtrl'
      }
    }
  })
  .state('app.clientes', {
    url: '/clientes',
    views: {
      'menuContent': {
        templateUrl: 'templates/clientes.html',
        controller: 'ClientsCtrl'
      }
    }
  })
  .state('app.fornecedores', {
    url: '/fornecedores',
    views: {
      'menuContent': {
        templateUrl: 'templates/fornecedores.html',
        controller: 'SuppliersCtrl'
      }
    }
  })
 
  .state('app.logout', {
    url: '/logout',
    views: {
      'menuContent': {
        templateUrl: 'templates/logout.html',
        controller: 'LogOutCtrl'
      }
    }
  })   
    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});