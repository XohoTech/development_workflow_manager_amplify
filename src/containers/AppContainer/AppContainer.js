import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container, Nav } from 'reactstrap';
import {
  AppBreadcrumb,
  AppHeader,
  AppNavbarBrand,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
  AppSidebarToggler
} from '@coreui/react';

import navigation from '../../_nav';
import routes from '../../routes';

import XTLogo from '../../assets/img/brand/XT-logo.png';
import FullLogo from '../../assets/img/brand/Full-Logo.png';

const AppContainer = props => (
  <div className="app">
    <AppHeader fixed>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{
          src: FullLogo,
          width: 89,
          height: 25,
          alt: 'XohoTech Logo'
        }}
        minimized={{
          src: XTLogo,
          width: 30,
          height: 30,
          alt: 'XohoTech Logo'
        }}
      />
      <AppSidebarToggler className="d-md-down-none" display="lg" />
      <Nav className="ml-auto" navbar />
    </AppHeader>
    <div className="app-body">
      <AppSidebar fixed display="lg">
        <AppSidebarHeader />
        <AppSidebarForm />
        <AppSidebarNav navConfig={navigation} {...props} />
        <AppSidebarFooter />
        <AppSidebarMinimizer />
      </AppSidebar>
      <main className="main">
        <AppBreadcrumb appRoutes={routes} />
        <Container fluid>
          <Switch>
            {routes.map((route, idx) => (route.component ? (
              <Route
                key={route.name}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={componentProps => (
                  <route.component {...componentProps} />
                )}
              />
            )
              : (null)))}
            <Redirect from="/" exact to="/dashboard" />
            <Redirect from="/redirect" to="/projects" />
          </Switch>
        </Container>
      </main>
    </div>
  </div>);

export default AppContainer;
