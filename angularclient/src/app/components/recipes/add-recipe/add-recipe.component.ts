import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Recipe} from '../../../model/Recipe';
import {RecipeService} from '../../../services/recipe.service';

import {Photo} from '../../../model/Photo';
import {PhotoService} from '../../../services/photo.service';
import {InputFileComponent} from 'ngx-input-file';

import {PassDataService} from '../../../services/pass-data.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-add-recipe',
    templateUrl: './add-recipe.component.html',
    styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

    recipe: Recipe = new Recipe(null, null, null, null, null, null, null, null, null);

    constructor(private recipeService: RecipeService, private photoService: PhotoService, private passDataService: PassDataService,
                private authService: AuthService, private router: Router) {
    }

    private toast: ToastrService;
    /*nGModel*/
    nameIngredient: string;
    amount: string;
    name: string;
    category: string;
    portion: string;
    preparationTime: string;
    description: string;
    map = new Map();
    photo: Photo;
    saveRecipePoto: Photo;
    mapSelected = false;
    mapName: string;
    success = false;
    error = false;
    public imageURL = '';
    public clickedRecipeid: string;
    /*select*/
    selectedPortion: string;
    selectedPreparationTime: string;
    tempMap: any;
    image;
    isImageLoaded: boolean;
    dane: string;
    recipes: Recipe[] = [];
    photos: Photo[] = [];
    public resizedImage: string;
    savedID: string;
    recpePhoto: Photo = new Photo(null, null, null);
    oldRecipePhoto: Photo = new Photo(null, null, null);
    getimage: string;
    idusera: string;
    imageFromLink: string;
    imgFromLink = new Image();
    isImageFromLinkLoaded: boolean;
    iifOldPhotoExists: boolean;
    oldim: string;

    ngOnInit(): void {
        this.imgFromLink.src = '';
        if (JSON.parse(localStorage.getItem('user')) !== null) {
            const userRole = JSON.parse(localStorage.getItem('user')).role;
            if (this.authService.userLoggedIn) {
                this.recipe.ingredients = new Map();

                this.checkAllRecipes();
                this.checkAllPhotos();

                if (this.passDataService.clickedRecipe) {
                    this.name = this.passDataService.clickedRecipe.name;
                    this.category = this.passDataService.clickedRecipe.category;
                    this.description = this.passDataService.clickedRecipe.description;
                    this.preparationTime = this.passDataService.clickedRecipe.preparationTime;
                    this.portion = this.passDataService.clickedRecipe.portion;
                    this.clickedRecipeid = this.passDataService.clickedRecipe.id;
                    this.isImageFromLinkLoaded = true;
                    this.findImage(this.passDataService.clickedRecipe.id);
                    //
                    console.log(this.imgFromLink.src);
                    this.oldim = this.passDataService.clickedRecipe.id;
                    this.passDataService.clickedPhoto = null;

                    this.map = this.passDataService.clickedRecipe.ingredients;
                    for (let [key, value] of Object.entries(this.map)) {
                        this.recipe.ingredients.set(key, value);
                    }

                    console.log(this.recipe.ingredients);
                    console.log('id: ' + this.passDataService.clickedRecipe.id);
                    this.passDataService.clickedRecipe = new Recipe(null, null, null, null,
                        null, null, null, null, null);
                    this.passDataService.clickedPhoto = null;
                } else {
                }

            }
        } else {
            this.router.navigate(['/access-denied']);
        }

    }

    @ViewChild('mapInput', {static: false})
    public mapInputComponent: InputFileComponent;

    addIngredient() {
        this.recipe.ingredients.set(this.nameIngredient, this.amount);

        this.map = this.recipe.ingredients;
        this.nameIngredient = null;
        this.amount = null;
        console.log(this.map);


    }

    selectPortion(id: string) {
        this.selectedPortion = id;
    }

    selectPreparationTime(id: string) {
        this.selectedPreparationTime = id;
    }

    addRecipe() {
        if (this.checkname() && this.checkcategory()) {
            this.recipe.name = this.name;
            this.recipe.category = this.category;
            this.recipe.preparationTime = this.preparationTime;
            this.recipe.description = this.description;
            this.recipe.portion = this.selectedPortion;
            this.recipe.preparationTime = this.selectedPreparationTime;
            this.mapName = 'test';
            const formData = new FormData();
            formData.append('name', name);

            const convMap = {};
            this.map.forEach((val: string, key: string) => {
                convMap[key] = val;
            });
            this.recipe.ingredients = convMap;
            this.recipe.id = this.clickedRecipeid;
            this.photo = this.saveRecipePoto;
            this.recipe.userId = JSON.parse(localStorage.getItem('user')).id;
            // console.log(btoa(this.mapInputComponent.files[0].file));
            this.recipeService.save(this.recipe).subscribe(
                result => {

                    this.recipe.id = this.clickedRecipeid;
                    if (this.checkIfRecipeExists(this.recipe.id)) {
                        this.recipes[this.recipes.findIndex(item => item.id == result.id)] = result;
                    } else {
                    }


                    this.idusera = result.id;

                    this.recpePhoto.name = this.idusera;
                    this.photoService.getPhotos().subscribe(pho => {
                        pho.forEach(photo => {
                            this.photos.push(photo);
                        });
                        this.photos.forEach(phot => {
                            if (phot.name !== this.recpePhoto.name) {
                                console.log('nie istnieje');
                            } else {
                                this.photoService.delete(phot).subscribe(
                                    res => {
                                        console.log('Pomyślnie usunięto fotke!');
                                    },
                                    error => {
                                        console.log('błąd!');
                                    }
                                );
                                this.iifOldPhotoExists = true;
                                this.photos[this.photos.findIndex(item => item.name == this.recpePhoto.name)] = this.recpePhoto;
                                this.photoService.savePhoto(this.recpePhoto).subscribe(save => {
                                    this.toast.success('Pomyślnie edytowano!');
                                });
                            }
                        });
                        if(!this.iifOldPhotoExists){
                            this.photoService.savePhoto(this.recpePhoto).subscribe(save => {
                                this.toast.success('Pomyślnie edytowano!');
                            });
                        }
                    });

                    this.savedID = this.recipe.name;
                    this.recipe = new Recipe(null, null, null, null, null, null, null, null,
                        null);
                    this.recipeService.getRecipe(result.id).subscribe(przepis => {
                    });
                },
                error => {
                }
            );

            this.recipes = [];
            this.photos = [];
        }

    }

    checkIfRecipeExists(id: string) {
        return this.recipes.some(item => item.id == id);
    }

    checkIfPhotoExists(id: string) {
        return this.photos.some(item => item.id == id);
    }


    public checkAllRecipes() {
        this.recipeService.getRecipes().subscribe(all => {
            all.forEach(recipe => {
                this.recipes.push(recipe);
            });
        });

    }

    public checkAllPhotos() {

    }

    public addfoto() {

    }

    public deleteIngredient(key: string) {
        this.map.delete(key);
        console.log(this.map);
    }

    public editIngredient(key: string) {
        this.nameIngredient = key;
        this.amount = this.map.get(key);
    }

    changeImageListener(): void {
        const img = document.getElementById('photo') as HTMLImageElement;
        img.src = this.getimage;
    }

   /* changeListener($event): void {
        this.readThis($event.target);
    }

    readThis(inputValue: any): void {


        var file: File = inputValue.files[0];
        var myReader: FileReader = new FileReader();
        this.isImageFromLinkLoaded = false;
        myReader.onloadend = (e) => {
            this.image = myReader.result;
            this.dane = myReader.result.toString();
            this.recpePhoto.photo = this.dane;
            this.isImageLoaded = true;
            return new Promise((res, rej) => {
                const img = new Image();
                img.src = this.recpePhoto.photo;
                img.onload = () => {
                    const elem = document.createElement('canvas');
                    elem.width = img.width;
                    elem.height = img.height;
                    if (elem.width >= 200) {
                        elem.width = 200;
                    }
                    if (elem.height >= 150) {
                        elem.height = 150;
                    }

                    const ctx = elem.getContext('2d');

                    ctx.drawImage(img, 0, 0, elem.width, elem.height);
                    const data = ctx.canvas.toDataURL();
                    this.resizedImage = data;
                    this.recpePhoto.photo = this.resizedImage;
                };
                img.onerror = error => rej(error);
            });

        };
        myReader.readAsDataURL(file);
    }*/

    checkname() {
        const numbers = /^[a-zA-Z\s]+/;

        if (numbers.test(this.name)) {
            return true;
        } else if (this.name === null) {
            return false;
        } else {
            return false;
        }
    }

    checkcategory() {
        const numbers = /^[a-zA-Z\s]+/;

        if (numbers.test(this.category)) {
            return true;
        } else if (this.category === null) {
            return false;
        } else {
            return false;
        }
    }


    setImageSrcFromLink() {
        this.passDataService.clickedPhoto = null;

        console.log(this.imageFromLink);
        this.isImageFromLinkLoaded = true;
        this.imgFromLink.src = this.imageFromLink;
        this.recpePhoto.photo = this.imageFromLink;
        this.oldRecipePhoto.photo = this.recpePhoto.photo;
    }

    findImage(recipeid: string) {
        this.photoService.getImageByRecipeId(recipeid).subscribe(photo => {
            this.imgFromLink.src = photo.photo;
        });

    }
}
