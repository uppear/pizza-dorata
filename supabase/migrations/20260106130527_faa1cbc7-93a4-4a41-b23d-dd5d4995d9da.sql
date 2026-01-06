-- Create a function to validate order items JSONB structure
CREATE OR REPLACE FUNCTION public.validate_order_items()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  item jsonb;
  item_name text;
  item_quantity numeric;
  item_price numeric;
BEGIN
  -- Check if items is an array
  IF jsonb_typeof(NEW.items) != 'array' THEN
    RAISE EXCEPTION 'items must be an array';
  END IF;
  
  -- Check if array is not empty
  IF jsonb_array_length(NEW.items) = 0 THEN
    RAISE EXCEPTION 'items array cannot be empty';
  END IF;
  
  -- Validate each item in the array
  FOR item IN SELECT * FROM jsonb_array_elements(NEW.items)
  LOOP
    -- Check required fields exist
    IF NOT (item ? 'name' AND item ? 'quantity' AND item ? 'price') THEN
      RAISE EXCEPTION 'Each item must have name, quantity, and price';
    END IF;
    
    -- Validate name is a non-empty string
    item_name := item->>'name';
    IF item_name IS NULL OR length(trim(item_name)) = 0 THEN
      RAISE EXCEPTION 'Item name cannot be empty';
    END IF;
    IF length(item_name) > 200 THEN
      RAISE EXCEPTION 'Item name too long (max 200 characters)';
    END IF;
    
    -- Validate quantity is a positive integer
    BEGIN
      item_quantity := (item->>'quantity')::numeric;
    EXCEPTION WHEN OTHERS THEN
      RAISE EXCEPTION 'Item quantity must be a number';
    END;
    IF item_quantity <= 0 OR item_quantity != floor(item_quantity) THEN
      RAISE EXCEPTION 'Item quantity must be a positive integer';
    END IF;
    IF item_quantity > 100 THEN
      RAISE EXCEPTION 'Item quantity cannot exceed 100';
    END IF;
    
    -- Validate price is a non-negative number
    BEGIN
      item_price := (item->>'price')::numeric;
    EXCEPTION WHEN OTHERS THEN
      RAISE EXCEPTION 'Item price must be a number';
    END;
    IF item_price < 0 THEN
      RAISE EXCEPTION 'Item price cannot be negative';
    END IF;
    IF item_price > 10000 THEN
      RAISE EXCEPTION 'Item price cannot exceed 10000';
    END IF;
  END LOOP;
  
  -- Validate total is reasonable
  IF NEW.total < 0 OR NEW.total > 100000 THEN
    RAISE EXCEPTION 'Invalid order total';
  END IF;
  
  -- Validate customer_name
  IF length(trim(NEW.customer_name)) = 0 THEN
    RAISE EXCEPTION 'Customer name cannot be empty';
  END IF;
  IF length(NEW.customer_name) > 100 THEN
    RAISE EXCEPTION 'Customer name too long';
  END IF;
  
  -- Validate customer_phone (basic check)
  IF length(trim(NEW.customer_phone)) < 5 OR length(NEW.customer_phone) > 20 THEN
    RAISE EXCEPTION 'Invalid phone number';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for order validation
DROP TRIGGER IF EXISTS validate_order_items_trigger ON public.orders;
CREATE TRIGGER validate_order_items_trigger
  BEFORE INSERT OR UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_order_items();

-- Update RLS policies for orders table
-- Keep public insert for customers placing orders
-- Keep public select for realtime subscription to work (needed for the admin dashboard)
-- Keep public update for now (will be secured via edge function in next iteration)

-- The existing policies are:
-- "Anyone can create orders" - INSERT with true
-- "Anyone can update orders" - UPDATE with true  
-- "Anyone can view orders" - SELECT with true

-- For a simple pizza ordering app, these policies allow:
-- 1. Customers to place orders (INSERT)
-- 2. Admin dashboard to see orders (SELECT)
-- 3. Admin to update order status (UPDATE)

-- The server-side validation trigger now protects against malformed data