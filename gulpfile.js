var gulp = require('gulp');
var lambda = require('gulp-awslambda');
var zip = require('gulp-zip')

var lambda_params1 = {
	FunctionName: 'getInventory',
	Role: 'arn:aws:iam::615275379173:role/lambda_basic_execution'
};
var lambda_params2 = {
	FunctionName: 'getOderStatus',
	Role: 'arn:aws:iam::615275379173:role/lambda_basic_execution'
};
var opts = {
	region: 'us-west-2'
};
gulp.task('default',function(){
    return gulp.src(['*.js','node_modules/**/*.js'] )
        .pipe(zip('getOrder.zip'))
        //.pipe(lambda(lambda_params, opts))
        .pipe(gulp.dest('.'));
});

gulp.task('helloworld', function(){
    console.log("Hello World");

    //New Line

    //New Line 3
});