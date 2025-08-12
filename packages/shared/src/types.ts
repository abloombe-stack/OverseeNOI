export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  companyId: string;
  status: 'ACTIVE' | 'INACTIVE';
  roles: UserRole[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRole {
  id: string;
  userId: string;
  propertyId?: string;
  role: Role;
  scope: Record<string, any>;
}

export enum Role {
  VP = "VP",
  DIRECTOR = "DIRECTOR",
  ASSET_MANAGER = "ASSET_MANAGER",
  SENIOR_ANALYST = "SENIOR_ANALYST",
  CAPEX_PM = "CAPEX_PM",
  REGIONAL_PM = "REGIONAL_PM",
  PROPERTY_MANAGER = "PROPERTY_MANAGER",
  ASSISTANT_PM_AR = "ASSISTANT_PM_AR",
  LEASING_MANAGER = "LEASING_MANAGER",
  LEASING_AGENT = "LEASING_AGENT",
  MAINTENANCE_SUPER = "MAINTENANCE_SUPER",
  MAINTENANCE_TECH = "MAINTENANCE_TECH",
  VENDOR = "VENDOR"
}

export interface Property {
  id: string;
  name: string;
  address: string;
  unitCount: number;
  propertyType: string;
  portfolioId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  channelId: string;
  assigneeId?: string;
  createdById: string;
  dueAt?: Date;
  slaAt?: Date;
  tags: string[];
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  SCHEDULED = "SCHEDULED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL"
}

export interface Message {
  id: string;
  content: string;
  channelId?: string;
  taskId?: string;
  authorId: string;
  attachments: string[];
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Channel {
  id: string;
  key: string;
  name: string;
  propertyId: string;
  visibilityRoles: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RentRollSnapshot {
  id: string;
  propertyId: string;
  date: Date;
  units: RentRollUnit[];
  aggregates: RentRollAggregates;
  createdAt: Date;
}

export interface RentRollUnit {
  unit_id: string;
  unit_label: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  tenant_name_masked?: string;
  lease_start?: Date;
  lease_end?: Date;
  market_rent: number;
  actual_rent: number;
  balance: number;
  status: 'occupied' | 'vacant' | 'notice' | 'unknown';
  delinquency_bucket: string;
}

export interface RentRollAggregates {
  total_units: number;
  occupied_units: number;
  total_balance: number;
  total_market_rent: number;
  total_actual_rent: number;
  delinquency_30?: number;
  delinquency_60?: number;
  delinquency_90_plus?: number;
}

export interface ActivityEvent {
  id: string;
  userId: string;
  context: Record<string, any>;
  action: string;
  duration?: number;
  success: boolean;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface NotificationPayload {
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, any>;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  channels?: ('push' | 'email' | 'sms')[];
}