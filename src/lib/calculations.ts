import type { ServiceItem } from '@/types/project'

export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)

export const calcLineTotal = (item: ServiceItem): number =>
  item.quantity * item.unitPrice

export const calcSubtotal = (services: ServiceItem[]): number =>
  services.reduce((sum, svc) => sum + calcLineTotal(svc), 0)

export const calcTax = (subtotal: number, taxRate: number): number =>
  subtotal * (taxRate / 100)

export const calcGrandTotal = (subtotal: number, tax: number): number =>
  subtotal + tax
