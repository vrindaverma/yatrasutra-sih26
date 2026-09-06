ROUTES={
 "Krishna Heritage":["Vrindavan","Barsana"],
 "Braj — Vrindavan & Barsana":["Mathura","Vrindavan","Barsana"],
 "Shiva & Sacred Rivers":["Somnath","Dwarka"],
 "Saurashtra — Somnath & Dwarka":["Somnath","Dwarka"],
 "Interfaith Heritage":["Ajmer","Pushkar","Amritsar"],
 "Buddhist Heritage":["Sarnath","Bodh Gaya","Nalanda"],
}
DAY_LIBRARY=[
 "Arrival, orientation and local heritage walk",
 "Sacred site visit, etiquette guide and sonic heritage stop",
 "Artisan workshop / CultureSwap experience",
 "Food heritage trail and community-hosted cultural experience",
 "Slow-travel buffer, local market and oral-history stop",
 "Second sacred/cultural cluster with accessibility-aware routing",
 "Seva opportunity and reflective evening",
 "Heritage passport completion and return journey",
]
def generate_plan(city,budget,days,interest,mode,travellers):
    route=ROUTES.get(interest, ROUTES["Krishna Heritage"])
    mode_factor={"Budget":.78,"Comfortable":.91,"Senior-friendly":.88}.get(mode,.85)
    base_per_person=3100*days
    estimate=int(min(budget, max(3500, base_per_person*travellers*mode_factor)))
    estimate=(estimate//10)*10
    split={
      "travel":round(estimate*.31), "stay":round(estimate*.27),
      "food":round(estimate*.18)
    }
    split["culture_buffer"]=estimate-sum(split.values())
    itinerary=[]
    for i in range(days):
        stop=route[min(i,len(route)-1)]
        itinerary.append({"day":i+1,"stop":stop,"plan":DAY_LIBRARY[i%len(DAY_LIBRARY)]})
    return {"city":city,"route":route,"days":days,"interest":interest,"mode":mode,
            "travellers":travellers,"budget":budget,"estimated_cost":estimate,
            "savings":budget-estimate,"split":split,"itinerary":itinerary}
