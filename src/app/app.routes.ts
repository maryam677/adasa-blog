import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Blog } from './pages/blog/blog';
import { BlogDetails } from './pages/blog-details/blog-details';
import { NotFound } from './pages/not-found/not-found';
import { About } from './pages/about/about';

export const routes: Routes = [

  { path: '', component: Home },

  { path: 'blog', component: Blog },

  { path: 'blog/:slug', component: BlogDetails },
   {path: 'about',
  component: About},

  { path: '**', component: NotFound }

];