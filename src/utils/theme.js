/**
 * 深色模式工具
 * 控制全局样式切换 + localStorage持久化
 */
import { Storage } from './storage'

// 主题类名
export const THEME_CLASS = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme'
}

// 初始化主题
export const initTheme = () => {
  const savedTheme = Storage.get('blog_theme') || THEME_CLASS.LIGHT
  document.documentElement.className = savedTheme
  return savedTheme
}

// 切换主题
export const toggleTheme = () => {
  const currentTheme = document.documentElement.className
  const newTheme = currentTheme === THEME_CLASS.LIGHT 
    ? THEME_CLASS.DARK 
    : THEME_CLASS.LIGHT
  
  document.documentElement.className = newTheme
  Storage.set('blog_theme', newTheme)
  return newTheme
}

// 获取当前主题
export const getCurrentTheme = () => {
  return document.documentElement.className || THEME_CLASS.LIGHT
}