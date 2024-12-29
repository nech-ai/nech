-- Create function to calculate total cost for a chat
create
or replace function public.get_chat_total_cost (chat_id uuid) returns NUMERIC language plpgsql security definer as $$
declare
  total_cost NUMERIC;
begin
  select coalesce(sum((metadata->>'totalCost')::numeric), 0)
  into total_cost
  from public.messages
  where messages.chat_id = $1
    and messages.metadata is not null
    and messages.metadata->>'totalCost' is not null;

  return round(total_cost::numeric, 6);
end;
$$;

-- Grant execute permission to authenticated users
grant
execute on function public.get_chat_total_cost to authenticated;
