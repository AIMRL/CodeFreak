# CodeFreak

Before Configure the project:
1-Download Visual Studio Community 2017 or later version from micosoft official website. https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=community&ch=pre&rel=16
2-Install Visual studio and make sure that its working properly
3-Download and install Microsoft SQL Server Express Edition from the microsoft website https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=community&ch=pre&rel=16
4-Download TDM GCC compiler and verify its installation by running g++ --version command on command line.
5- Verify Node is Installed
6- open cmd and run following command:
	npm install -g @angular/cli

Please follow the steps for Cloning the project 
1- Pull the project
2- Goto database folder. There is script file of CodeFreak database. Execute that script in sql server.
3- Open the project in visual studio.
4- Open the file DBCodeFreakContext placed at CodeFreak1->Models.
5- Find Id=sa;Password=123456; and replace with your sql server credentials.
6- Now open the command shell in directory 'CodeFreak1/ClientApp.
7- In the shell run the command 'npm install'. Don't use single quate that is written just the identification of command. If       you don't understand then just run the following text.
   npm install -g @angular/cli
8- Above command described in point 7 will take 10-15 minutes because it downloads files of size 300mb+.
9- Now right click on CodeFreak project in visual studio and go to properties of CodeFreak project. On left side find debug option, click on debug option you will find new page. Now scroll down page and find 'Enable SSL'. Check Enable SSL and copy path.
10- Now go to angular project and find AppSetting.ts file. Find file on this path: ClientApp->src->app->AppSetting.ts. there is an variable baseUrl. Change value of baseUrl with copied value in step above step.
11- Now Configuration are complete. Run the application.

Whenever you pull project run following command in ClentApp Folder:
npm install
Thanks.
