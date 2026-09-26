// Source - https://stackoverflow.com/a/42031251
// Posted by Heretic Monkey
// Retrieved 2026-09-26, License - CC BY-SA 3.0


// La limite est 2
var limit = 2;
// Pour chaque checkbox, on ajoute une fonction pour l'événement "click"
$('input:checkbox').on('click', function (e) 
{
    // Si la checkbox n'est pas cochée ou si le nombre de checkbox cochées est inférieur ou égal à la limite,
    if (!this.checked || $('input:checkbox:checked').length <= limit) 
        {
            // ça retourne vrai, donc ça le permet
            return true;
        }
    return false;
});