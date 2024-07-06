# User Types 
## Directeur 
### User Stories 
- user 
## Responsable d 'espace
### User Stories 
## Ouvrier
### User Stories 

# 3/7/2024 
# for all tables 
## change api WorkSpaces -> wordspaces
## handle view all 
## next and previous 
# for all forms 
## add intended title and texting  
# interface 
## z-indexing layout 
# dashboard 
## build history graphe  
## add alert where exist a gaz danger 
# users 
## for responsable add workspace  (i catch id_resp in http request and add it to affecation api )  fix problem of insert in affectation with ilyass) 
## fix unicity of firstname  done 
## fix token password  done 
## fix form edit and create  done 
##  search input when submit and no input retunr all users same with all data tables done 
## when return user as reponsable return their id_ws if exist 
# espaces 
## "/noresponsable",WorkSpacesWithoutRes fix 
## getWorkspace   if reponsable of this workspace don't exist return id_resp:null, start, end if not return three values 
# affectation 
## /workspace/:id_ws return all affectations(reponsable) for this workspace 

# planning   
<!-- ## fix datetime format between mysql and fullcalendar delegate to ilyass  (we handle it )
## fix add form when submit add data to database done (all things work )
## when deleting also delete from database and edit same done  
## work edit meeting ( can change only title description or id_resp);  -->
## handle problem where hasEnd = false that make end = null (when is allday bydefault insert end  = null in server side );  done finally 

<!-- # missions 
## fix seach input (handle all cases (without value...  ))  done
## handle title and interface  done
## Responsible of mission don't appear in card  work done  -->
# authcontext 
## when token expired demand from user to login again if he want to complete 
# Measures 
## handle tabs and search box and actions ( on measures)  done 
# home page 
## handle dark mode 
## add nice logo 
## portfolio of factory 
## describe a factory 
## remove signup from it    
# authentifaction context
## show a custom alert to demand from users to login if he want to complete when token is expired 



