const errors = {
  403: {
    header: 'Error 403',
    svg: require('../assets/forbidden.gif').default,
    title: 'unauthorizedAccessTitle',
    message: 'unauthorizedAccessDescription',
    buttonText: 'loginLabel',
    showDetails: false,
  },
  404: {
    header: 'Error 404',
    svg: require('../assets/pageNotFound.gif').default,
    title: 'pageNotFoundTitle',
    message: 'pageNotFoundDescription',
    buttonText: 'backLabel',
    showDetails: true,
  },
  500: {
    header: 'Error 500',
    svg: require('../assets/serverError.gif').default,
    title: 'serverErrorTitle',
    message: 'serverErrorDesc',
    buttonText: 'reloadLabel',
    showDetails: true,
  },
  offline: {
    header: 'No connection',
    svg: require('../assets/noInternetConection.gif').default,
    title: 'noConnectionTitle',
    message: 'noConnectionDesc',
    buttonText: 'reloadLabel',
    showDetails: false,
  },
};

export default errors;
