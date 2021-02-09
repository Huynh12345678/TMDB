import { lazy } from 'react';

const timeout = 500;

export const Signup = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, timeout));
    return import('../pages/Signup');
});
export const Login = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, timeout));
    return import('../pages/Login');
});
export const People = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, timeout));
    return import('../pages/People');
});
export const Keyword = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, timeout));
    return import('../pages/Keyword');
});
export const Popular = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, timeout));
    return import('../pages/Popular');
});
export const Search = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, timeout));
    return import('../pages/Search');
});
export const Home = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, timeout));
    return import('../pages/Home');
});
export const Movie = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, timeout));
    return import('../pages/Movie');
});
export const Tv = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, timeout));
    return import('../pages/Tv');
});
export const Person = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, timeout));
    return import('../pages/Person');
});
export const Collection = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, timeout));
    return import('../pages/Collection');
});
export const Company = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, timeout));
    return import('../pages/Company');
});
export const Videos = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, timeout));
    return import('../pages/Videos');
});
export const Images = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, timeout));
    return import('../pages/Images');
});
export const PeopleTv = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, timeout));
    return import('../pages/PeopleTv');
});
export const Error = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, timeout));
    return import('../pages/Error');
});