import  {createClient} from 'https://esm.sh/@supabase/supabase-js'



const supUrl = 'https://ijwakusuylsjrndjolqn.supabase.co'
const supKey = 'sb_publishable_nRKOVAxE_eyDXh7Ki1WulQ_nfwPrDJt'

//intialize
const supabase = createClient(supUrl,supKey)

console.log(supabase);

export default supabase;

