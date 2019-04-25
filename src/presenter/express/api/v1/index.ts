import { Router } from 'express';
import { AUTH, PERMISSIONS, ROLES, USERS } from '../../../../constants/routes';
import Config from '../../presenterFactory/Config';
import authFactory from './routes/auth/factory';
import permissionsFactory from './routes/permissions/factory';
import rolesFactory from './routes/roles/factory';
import usersFactory from './routes/users/factory';
import describeApi from './routes/utils/describeApi';

const apiV1 = (config: Config): Router => {
  /** Routes below have aready /api/v1 prefix */
  const router = Router();

  /* check permissions systems:
    - https://www.moesif.com/blog/technical/restful-apis/Authorization-on-RESTful-APIs/#
    - https://cloudify.co/2016/04/15/simple-secure-role-based-access-control-rest-api-rbac-server-devops-cloud-orchestration.html 
    - https://medium.com/technology-learning/how-we-solved-authentication-and-authorization-in-our-microservice-architecture-994539d1b6e6
    - https://www.nginx.com/blog/introduction-to-microservices/
    */
  router.use(AUTH, authFactory(config));
  router.use(USERS, usersFactory(config));
  router.use(ROLES, rolesFactory(config));
  router.use(PERMISSIONS, permissionsFactory(config));

  router.get('/', describeApi(config));

  return router;
};

export default apiV1;
