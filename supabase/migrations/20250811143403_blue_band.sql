/*
  # Enable Row Level Security (RLS)

  1. Security Policies
    - Enable RLS on all tenant-scoped tables
    - Create policies for multi-tenant data isolation
    - Add helper functions for user context

  2. Audit Functions
    - Create audit trigger function
    - Add audit triggers to sensitive tables

  3. User Context Functions
    - Functions to get user's company and property access
    - Used by RLS policies for access control
*/

-- Create helper functions for RLS
CREATE OR REPLACE FUNCTION get_user_company_id() RETURNS TEXT AS $$
BEGIN
  RETURN current_setting('app.current_user_company_id', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_user_property_ids() RETURNS TEXT[] AS $$
BEGIN
  RETURN string_to_array(current_setting('app.current_user_property_ids', true), ',');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    INSERT INTO audit_log (table_name, operation, old_values, user_id, company_id)
    VALUES (TG_TABLE_NAME, TG_OP, row_to_json(OLD), 
            current_setting('app.current_user_id', true),
            current_setting('app.current_user_company_id', true));
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_log (table_name, operation, old_values, new_values, user_id, company_id)
    VALUES (TG_TABLE_NAME, TG_OP, row_to_json(OLD), row_to_json(NEW),
            current_setting('app.current_user_id', true),
            current_setting('app.current_user_company_id', true));
    RETURN NEW;
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO audit_log (table_name, operation, new_values, user_id, company_id)
    VALUES (TG_TABLE_NAME, TG_OP, row_to_json(NEW),
            current_setting('app.current_user_id', true),
            current_setting('app.current_user_company_id', true));
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on tenant-scoped tables
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE rent_roll_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE rent_roll_diffs ENABLE ROW LEVEL SECURITY;
ALTER TABLE comp_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE bid_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for tasks
CREATE POLICY "tasks_tenant_isolation" ON tasks
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM channels c
      JOIN properties p ON c."propertyId" = p.id
      JOIN portfolios pf ON p."portfolioId" = pf.id
      WHERE c.id = tasks."channelId"
      AND pf."companyId" = get_user_company_id()
      AND (p.id = ANY(get_user_property_ids()) OR get_user_property_ids() = ARRAY['*'])
    )
  );

-- Create RLS policies for task_events
CREATE POLICY "task_events_tenant_isolation" ON task_events
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM tasks t
      JOIN channels c ON t."channelId" = c.id
      JOIN properties p ON c."propertyId" = p.id
      JOIN portfolios pf ON p."portfolioId" = pf.id
      WHERE t.id = task_events."taskId"
      AND pf."companyId" = get_user_company_id()
      AND (p.id = ANY(get_user_property_ids()) OR get_user_property_ids() = ARRAY['*'])
    )
  );

-- Create RLS policies for messages
CREATE POLICY "messages_tenant_isolation" ON messages
  FOR ALL
  USING (
    ("channelId" IS NOT NULL AND EXISTS (
      SELECT 1 FROM channels c
      JOIN properties p ON c."propertyId" = p.id
      JOIN portfolios pf ON p."portfolioId" = pf.id
      WHERE c.id = messages."channelId"
      AND pf."companyId" = get_user_company_id()
      AND (p.id = ANY(get_user_property_ids()) OR get_user_property_ids() = ARRAY['*'])
    ))
    OR
    ("taskId" IS NOT NULL AND EXISTS (
      SELECT 1 FROM tasks t
      JOIN channels c ON t."channelId" = c.id
      JOIN properties p ON c."propertyId" = p.id
      JOIN portfolios pf ON p."portfolioId" = pf.id
      WHERE t.id = messages."taskId"
      AND pf."companyId" = get_user_company_id()
      AND (p.id = ANY(get_user_property_ids()) OR get_user_property_ids() = ARRAY['*'])
    ))
  );

-- Create RLS policies for rent_roll_snapshots
CREATE POLICY "rent_roll_snapshots_tenant_isolation" ON rent_roll_snapshots
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM properties p
      JOIN portfolios pf ON p."portfolioId" = pf.id
      WHERE p.id = rent_roll_snapshots."propertyId"
      AND pf."companyId" = get_user_company_id()
      AND (p.id = ANY(get_user_property_ids()) OR get_user_property_ids() = ARRAY['*'])
    )
  );

-- Create RLS policies for rent_roll_diffs
CREATE POLICY "rent_roll_diffs_tenant_isolation" ON rent_roll_diffs
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM properties p
      JOIN portfolios pf ON p."portfolioId" = pf.id
      WHERE p.id = rent_roll_diffs."propertyId"
      AND pf."companyId" = get_user_company_id()
      AND (p.id = ANY(get_user_property_ids()) OR get_user_property_ids() = ARRAY['*'])
    )
  );

-- Create RLS policies for comp_snapshots
CREATE POLICY "comp_snapshots_tenant_isolation" ON comp_snapshots
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM properties p
      JOIN portfolios pf ON p."portfolioId" = pf.id
      WHERE p.id = comp_snapshots."propertyId"
      AND pf."companyId" = get_user_company_id()
      AND (p.id = ANY(get_user_property_ids()) OR get_user_property_ids() = ARRAY['*'])
    )
  );

-- Create RLS policies for activity_events
CREATE POLICY "activity_events_user_isolation" ON activity_events
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = activity_events."userId"
      AND u."companyId" = get_user_company_id()
    )
  );

-- Create RLS policies for notifications
CREATE POLICY "notifications_user_isolation" ON notifications
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = notifications."userId"
      AND u."companyId" = get_user_company_id()
    )
  );

-- Create RLS policies for bid_requests
CREATE POLICY "bid_requests_tenant_isolation" ON bid_requests
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM properties p
      JOIN portfolios pf ON p."portfolioId" = pf.id
      WHERE p.id = bid_requests."propertyId"
      AND pf."companyId" = get_user_company_id()
      AND (p.id = ANY(get_user_property_ids()) OR get_user_property_ids() = ARRAY['*'])
    )
  );

-- Create RLS policies for bids
CREATE POLICY "bids_tenant_isolation" ON bids
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM bid_requests br
      JOIN properties p ON br."propertyId" = p.id
      JOIN portfolios pf ON p."portfolioId" = pf.id
      WHERE br.id = bids."bidRequestId"
      AND pf."companyId" = get_user_company_id()
      AND (p.id = ANY(get_user_property_ids()) OR get_user_property_ids() = ARRAY['*'])
    )
  );

-- Create RLS policies for work_orders
CREATE POLICY "work_orders_tenant_isolation" ON work_orders
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM properties p
      JOIN portfolios pf ON p."portfolioId" = pf.id
      WHERE p.id = work_orders."propertyId"
      AND pf."companyId" = get_user_company_id()
      AND (p.id = ANY(get_user_property_ids()) OR get_user_property_ids() = ARRAY['*'])
    )
  );

-- Create RLS policies for invoices
CREATE POLICY "invoices_tenant_isolation" ON invoices
  FOR ALL
  USING (
    ("propertyId" IS NOT NULL AND EXISTS (
      SELECT 1 FROM properties p
      JOIN portfolios pf ON p."portfolioId" = pf.id
      WHERE p.id = invoices."propertyId"
      AND pf."companyId" = get_user_company_id()
      AND (p.id = ANY(get_user_property_ids()) OR get_user_property_ids() = ARRAY['*'])
    ))
    OR
    ("propertyId" IS NULL AND EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = invoices."uploadedById"
      AND u."companyId" = get_user_company_id()
    ))
  );

-- Add audit triggers to sensitive tables
CREATE TRIGGER audit_tasks_trigger
  AFTER INSERT OR UPDATE OR DELETE ON tasks
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_messages_trigger
  AFTER INSERT OR UPDATE OR DELETE ON messages
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_rent_roll_snapshots_trigger
  AFTER INSERT OR UPDATE OR DELETE ON rent_roll_snapshots
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_bid_requests_trigger
  AFTER INSERT OR UPDATE OR DELETE ON bid_requests
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_bids_trigger
  AFTER INSERT OR UPDATE OR DELETE ON bids
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_invoices_trigger
  AFTER INSERT OR UPDATE OR DELETE ON invoices
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();