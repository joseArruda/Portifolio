import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Profile } from './pages/profile/profile';
import { Projects } from './pages/projects/projects';
import { Contacts } from './pages/contacts/contacts';

export const routes: Routes = [
    { path:'***',  redirectTo: 'home'},
    { path:'',  redirectTo: 'home', pathMatch: 'full'},
    { path:'home',  component: Home, title: 'Início'},
    { path:'profile', component: Profile, title: 'Sobre Mim' },
    { path:'projects', component: Projects, title: 'Projetos' },
    { path:'contacts', component: Contacts, title: 'Contatos' }
];
