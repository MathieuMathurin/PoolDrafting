import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { routing } from './app.routing';
import { JsonpModule }    from '@angular/http';

//Import custom components
import { MainAppComponent } from './main-app/main-app.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { TeamComponent } from './team/team.component';
import { RulesComponent } from './rules/rules.component';
import { FilterComponent } from './search/filter.component';
import { SearchResultComponent } from './search/search-result.component';
import { PlayerDescription } from './player/player-description.component';
import { ReplaceAccentsPipe } from './pipes/replace-accents.pipe';

//Import material Modules
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdIconModule } from '@angular2-material/icon';
import { MdInputModule } from '@angular2-material/input';
import { MdCardModule } from '@angular2-material/card'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        JsonpModule,
        routing,
        MdToolbarModule,
        MdSidenavModule,
        MdIconModule,
        MdInputModule,
        MdCardModule
    ],
    declarations: [
        MainAppComponent,
        LoginComponent,
        SearchComponent,
        TeamComponent,
        RulesComponent,
        FilterComponent,
        SearchResultComponent,
        PlayerDescription,
        ReplaceAccentsPipe
    ],
    bootstrap: [MainAppComponent]
})
export class AppModule { }